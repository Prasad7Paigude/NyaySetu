# Legal Updates Feature

This module provides functionality to collect, parse, and store legal updates from various sources including RSS feeds and web scraping.

## Structure

```
Legal Updates/
├─ parsers/
│  ├─ rss_parser.py        # RSS feed parsing
│  └─ html_scraper.py      # Web scraping
├─ models/
│  └─ mongo_models.py      # MongoDB data models
├─ config/
│  └─ settings.py          # Configuration settings
├─ data/                   # Data storage directory
├─ scripts/
│  └─ run_collect.py       # Main collection script
├─ requirements.txt        # Python dependencies
└─ README.md              # This file
```

## Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Set up environment variables:

```bash
export MONGODB_URI="your_mongodb_connection_string"
export DATABASE_NAME="nyaysetu"
export COLLECTION_NAME="raw_updates"
```

## Usage

### Running the Collection Script

```bash
python scripts/run_collect.py
```

This will:

- Fetch updates from configured RSS feeds
- Scrape updates from configured websites
- Store all updates in MongoDB

### Configuration

Edit `config/settings.py` to:

- Add new RSS feed sources
- Add new scraping targets
- Adjust scraping parameters
- Configure update intervals

## Data Model

Legal updates are stored with the following structure:

- `title`: Title of the legal update
- `source`: Source name (e.g., "Supreme Court of India")
- `url`: Link to the original content
- `published_date`: Publication date
- `content`: Full content (optional)
- `summary`: Brief summary (optional)
- `category`: Category/classification
- `tags`: List of relevant tags
- `created_at`: Timestamp when stored
- `updated_at`: Last update timestamp

## Development

### Adding New RSS Feeds

Edit `config/settings.py` and add to `RSS_FEEDS`:

```python
{
    "name": "Feed Name",
    "url": "https://example.com/feed.xml",
    "category": "Category"
}
```

### Adding New Scraping Sources

Edit `config/settings.py` and add to `SCRAPING_SOURCES`:

```python
{
    "name": "Source Name",
    "url": "https://example.com/updates",
    "category": "Category"
}
```

## License

Part of the NyaySetu project.
