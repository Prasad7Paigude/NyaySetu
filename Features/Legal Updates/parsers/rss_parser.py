# parsers/rss_parser.py
import feedparser
from datetime import datetime

class RSSParser:
    """
    Minimal RSSParser used by run_collect.
    parse_feed(url) -> list[dict]
    """
    def __init__(self, timeout=10):
        self.timeout = timeout

    def parse_feed(self, url):
        try:
            feed = feedparser.parse(url)
        except Exception:
            return []

        items = []
        for entry in getattr(feed, "entries", []):
            item = {
                "title": entry.get("title") or "",
                "url": entry.get("link") or entry.get("id") or None,
                "content_raw": entry.get("summary") or entry.get("content", [{}])[0].get("value", "") if entry.get("content") else entry.get("summary",""),
                "published_at": None
            }
            # try to parse published date
            published = entry.get("published_parsed") or entry.get("updated_parsed")
            if published:
                try:
                    from datetime import datetime
                    item["published_at"] = datetime(*published[:6])
                except Exception:
                    item["published_at"] = None
            items.append(item)
        return items
