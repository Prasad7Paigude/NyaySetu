#!/usr/bin/env python3
"""
Resilient run_collect script that adapts to different parser APIs (class vs function).
"""

from pathlib import Path
import sys
import logging
from datetime import datetime
from pymongo import UpdateOne

# ensure project root is importable
sys.path.insert(0, str(Path(__file__).parent.parent))

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("run_collect")

# Try flexible imports for RSS parser
_rss_adapter = None
try:
    # preferred: class RSSParser with method parse_feed(url) -> List[dict]
    from parsers.rss_parser import RSSParser

    def _rss_adapter(feed_url):
        parser = RSSParser()
        return parser.parse_feed(feed_url)

    logger.info("RSSParser class found in parsers.rss_parser")
except Exception:
    try:
        # fallback: function parse_feed(url) -> List[dict]
        from parsers.rss_parser import parse_feed

        def _rss_adapter(feed_url):
            return parse_feed(feed_url)

        logger.info("parse_feed function found in parsers.rss_parser")
    except Exception:
        try:
            # fallback: parse_and_store() might insert directly; we will call it and return empty
            from parsers.rss_parser import parse_and_store as _rss_store_fn

            def _rss_adapter(feed_url):
                # parse_and_store likely doesn't accept url param; call it and return []
                _rss_store_fn()
                return []

            logger.info("parse_and_store function found in parsers.rss_parser (fallback)")
        except Exception:
            logger.warning("No known entrypoint found in parsers.rss_parser; RSS will be skipped")
            _rss_adapter = None

# Try flexible imports for HTML scraper
_html_adapter = None
try:
    # preferred: class HTMLScraper with method scrape_updates(url) -> List[dict]
    from parsers.html_scraper import HTMLScraper

    def _html_adapter(page_url):
        scraper = HTMLScraper()
        return scraper.scrape_updates(page_url)

    logger.info("HTMLScraper class found in parsers.html_scraper")
except Exception:
    try:
        # fallback: function scrape_updates(url)
        from parsers.html_scraper import scrape_updates

        def _html_adapter(page_url):
            return scrape_updates(page_url)

        logger.info("scrape_updates function found in parsers.html_scraper")
    except Exception:
        try:
            # fallback alternate filename spelling
            from parsers.html_scrapper import HTMLScraper as HTMLScraperAlt

            def _html_adapter(page_url):
                scraper = HTMLScraperAlt()
                return scraper.scrape_updates(page_url)

            logger.info("HTMLScraper found in parsers.html_scrapper (alternate)")
        except Exception:
            try:
                from parsers.html_scrapper import scrape_updates as scrape_updates_alt

                def _html_adapter(page_url):
                    return scrape_updates_alt(page_url)

                logger.info("scrape_updates found in parsers.html_scrapper (alternate)")
            except Exception:
                logger.warning("No known entrypoint found in parsers.html_scraper/html_scrapper; HTML scraping will be skipped")
                _html_adapter = None

# Config (must exist)
try:
    from config.settings import RSS_FEEDS, SCRAPING_SOURCES, MONGODB_URI, DATABASE_NAME, COLLECTION_NAME
except Exception as e:
    logger.exception("Failed to import config.settings. Fix config/settings.py. Error: %s", e)
    raise

# DB util fallback
_use_get_db = False
try:
    from models.mongo_models import get_db
    _use_get_db = True
except Exception:
    from pymongo import MongoClient

def normalize_update(item: dict, default_category: str, source_name: str) -> dict:
    normalized = dict(item or {})
    normalized.setdefault("title", "")
    normalized.setdefault("url", None)
    normalized.setdefault("content_raw", normalized.get("content_raw", ""))
    normalized.setdefault("published_at", normalized.get("published_at", None))
    normalized["category"] = normalized.get("category", default_category)
    normalized["source"] = source_name
    normalized["crawler_fetched_at"] = datetime.utcnow()
    normalized["ingest_status"] = normalized.get("ingest_status", "raw")
    return normalized

def connect_db():
    if _use_get_db:
        return get_db()
    else:
        client = MongoClient(MONGODB_URI)
        return client[DATABASE_NAME]

def upsert_bulk(collection, docs):
    ops = []
    for doc in docs:
        url = doc.get("url")
        if not url:
            logger.warning("Skipping doc without URL (title preview): %s", doc.get("title","")[:80])
            continue
        ops.append(UpdateOne({"url": url}, {"$set": doc}, upsert=True))
    if not ops:
        return 0
    try:
        res = collection.bulk_write(ops, ordered=False)
        return res.upserted_count + res.modified_count
    except Exception as e:
        logger.exception("Bulk write failed: %s", e)
        # fallback
        count = 0
        for op in ops:
            try:
                collection.update_one(op._filter, op._update, upsert=True)
                count += 1
            except Exception:
                logger.exception("Individual upsert failed for %s", op._filter)
        return count

def collect_rss(collection):
    if not _rss_adapter:
        logger.info("Skipping RSS collection: no adapter available")
        return
    logger.info("Starting RSS collection")
    total = 0
    for feed in RSS_FEEDS:
        name = feed.get("name", feed.get("url"))
        url = feed.get("url")
        logger.info("Processing RSS feed: %s", name)
        try:
            items = _rss_adapter(url)
            if not items:
                logger.info("  - No items returned from feed: %s", name)
                continue
            docs = [normalize_update(i, feed.get("category","General"), name) for i in items]
            n = upsert_bulk(collection, docs)
            logger.info("  - Collected %d updates from %s", n, name)
            total += n
        except Exception as e:
            logger.exception("Error processing feed %s: %s", name, e)
    logger.info("RSS collection done. Total inserted/updated: %d", total)

def collect_html(collection):
    if not _html_adapter:
        logger.info("Skipping HTML scraping: no adapter available")
        return
    logger.info("Starting HTML scraping")
    total = 0
    for src in SCRAPING_SOURCES:
        name = src.get("name", src.get("url"))
        url = src.get("url")
        logger.info("Scraping source: %s", name)
        try:
            items = _html_adapter(url)
            if not items:
                logger.info("  - No items returned from source: %s", name)
                continue
            docs = [normalize_update(i, src.get("category","General"), name) for i in items]
            n = upsert_bulk(collection, docs)
            logger.info("  - Collected %d updates from %s", n, name)
            total += n
        except Exception as e:
            logger.exception("Error scraping %s: %s", name, e)
    logger.info("HTML scraping done. Total inserted/updated: %d", total)

def main():
    logger.info("Legal updates collection started at %s", datetime.utcnow())
    try:
        db = connect_db()
        coll = db[COLLECTION_NAME]
        logger.info("Connected to MongoDB: %s.%s", DATABASE_NAME, COLLECTION_NAME)
        collect_rss(coll)
        collect_html(coll)
    except Exception as e:
        logger.exception("Fatal error during collection: %s", e)
    finally:
        try:
            if not _use_get_db:
                coll.database.client.close()
        except Exception:
            pass
    logger.info("Collection run finished at %s", datetime.utcnow())

if __name__ == "__main__":
    main()
