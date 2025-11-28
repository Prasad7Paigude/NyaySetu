# scripts/create_index.py
from models.mongo_models import raw_updates_collection

def main():
    coll = raw_updates_collection()
    idx = coll.create_index("url", unique=True)
    print("Created index:", idx)

if __name__ == "__main__":
    main()
