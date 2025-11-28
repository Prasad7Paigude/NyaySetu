# scripts/debug_summary.py
from models.mongo_models import get_db
from datetime import datetime
import json

def main():
    db = get_db()
    raw = db['raw_updates']

    total = raw.count_documents({})
    by_source = list(raw.aggregate([
        {"$group": {"_id": "$source", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]))
    recent = list(raw.find().sort("crawler_fetched_at", -1).limit(10))
    missing_url_count = raw.count_documents({"$or": [{"url": None}, {"url": ""}]})
    short_content_count = raw.count_documents({"$expr": {"$lt": [{"$strLenCP": {"$ifNull": ["$content_raw", ""]}}, 50]}})

    summary = {
        "timestamp": datetime.utcnow().isoformat(),
        "total_raw_updates": total,
        "by_source": by_source,
        "missing_url_count": missing_url_count,
        "short_content_count": short_content_count,
        "sample_recent_ids": [str(d["_id"]) for d in recent]
    }

    print(json.dumps(summary, indent=2, default=str))
    print("\n--- Recent sample (title / source / url / content_len) ---")
    for d in recent:
        print(f"- {d.get('source')[:30]:30} | {str(d.get('title',''))[:80]:80} | {d.get('url')} | len={len(d.get('content_raw',''))}")

if __name__ == "__main__":
    main()
