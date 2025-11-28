# scripts/test_atlas.py
import sys
from pathlib import Path

# === Make project root importable ===
# Adjust sys.path so 'models' can be imported from project root
proj_root = Path(__file__).resolve().parents[1]   # two levels up from this file: <project_root>/scripts
sys.path.append(str(proj_root))

# Now imports work
from models.mongo_models import raw_updates_collection
from datetime import datetime
import sys as _sys

def main():
    coll = raw_updates_collection()
    doc = {
        "source": "atlas_test",
        "title": "Atlas connection successful",
        "url": "http://example.com/test_atlas",
        "crawler_fetched_at": datetime.utcnow(),
        "content_raw": "connection test",
        "content_type": "test",
        "metadata": {}
    }
    try:
        res = coll.insert_one(doc)
        print("Inserted ID:", res.inserted_id)
        count = coll.count_documents({"source":"atlas_test"})
        print("Docs with source atlas_test:", count)
    except Exception as e:
        print("ERROR:", type(e).__name__, str(e))
        _sys.exit(1)

if __name__ == "__main__":
    main()
