# parsers/html_scraper.py
import requests
from bs4 import BeautifulSoup

class HTMLScraper:
    """
    Minimal HTML scraper used by run_collect.
    scrape_updates(url) -> list[dict]
    This will attempt to scrape a page and extract links and their titles.
    """
    def __init__(self, timeout=12):
        self.timeout = timeout
        self.headers = {"User-Agent": "NyaySetu/1.0 (+https://example.local)"}

    def scrape_updates(self, page_url):
        try:
            r = requests.get(page_url, timeout=self.timeout, headers=self.headers)
            r.raise_for_status()
        except Exception:
            return []

        soup = BeautifulSoup(r.text, "html.parser")
        results = []

        # Quick generic heuristics:
        #  - collect <a> tags within the page which likely point to notifications
        for a in soup.find_all("a", href=True):
            href = a["href"]
            text = a.get_text(strip=True) or href
            # normalize relative URLs
            if href.startswith("/"):
                from urllib.parse import urljoin
                href = urljoin(page_url, href)
            # skip anchors / javascript links
            if href.startswith("javascript:") or href.startswith("#"):
                continue
            results.append({
                "title": text,
                "url": href,
                "content_raw": a.get("title", "") or text
            })

        # de-duplicate by url, keep order
        seen = set()
        deduped = []
        for r in results:
            u = r.get("url")
            if u and u not in seen:
                seen.add(u)
                deduped.append(r)
        return deduped
