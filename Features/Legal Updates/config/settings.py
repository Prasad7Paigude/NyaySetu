# Configuration settings for Legal Updates feature

import os
from typing import Dict, List

# MongoDB Configuration
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DATABASE_NAME = os.getenv("DATABASE_NAME", "nyaysetu")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "raw_updates")

# RSS Feed Sources
RSS_FEEDS = [
    {"name": "PRS India", "url": "https://prsindia.org/media/rss-feed"},
    {"name": "PIB Legal/Policy", "url": "https://pib.gov.in/RssFeeds.aspx"},
]


# HTML Scraping Sources
SCRAPING_SOURCES = [
    {"name": "Indian Kanoon", "url": "https://www.indiankanoon.org/search/?formInput=notification"},
    {"name": "e-Gazette", "url": "https://egazette.gov.in/SearchCategoryWise.aspx"},
    {"name": "LawMin Notifications", "url": "https://legalaffairs.gov.in/notifications"},
]


# Scraping Configuration
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
REQUEST_TIMEOUT = 30
RATE_LIMIT_DELAY = 2  # seconds between requests

# Update Schedule
UPDATE_INTERVAL_HOURS = 24
