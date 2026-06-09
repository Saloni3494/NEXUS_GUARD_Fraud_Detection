import pandas as pd
from pymongo import MongoClient
import os

# Your exact MongoDB Atlas URL
MONGO_URI = "mongodb+srv://admin:test2026@cluster0.85lqd2z.mongodb.net/nexusguard?appName=Cluster0"

print(f"Connecting to MongoDB Atlas...")
client = MongoClient(MONGO_URI)
db = client.get_database() # Gets 'nexusguard' from the URI

# 1. Load Nodes
if os.path.exists("shared-data/nodes.csv"):
    print("Loading nodes.csv...")
    df_nodes = pd.read_csv("shared-data/nodes.csv")
    # Convert node_id to string to match Java models if needed, though pandas keeps int/string
    records = df_nodes.to_dict('records')
    
    # Clear existing and insert
    db.nodes.delete_many({})
    db.nodes.insert_many(records)
    print(f"✅ Successfully inserted {len(records)} nodes into MongoDB!")
else:
    print("❌ shared-data/nodes.csv not found!")

# 2. Load Transactions
if os.path.exists("shared-data/transactions.csv"):
    print("Loading transactions.csv...")
    df_tx = pd.read_csv("shared-data/transactions.csv")
    records = df_tx.to_dict('records')
    
    # Clear existing and insert
    db.transactions.delete_many({})
    db.transactions.insert_many(records)
    print(f"✅ Successfully inserted {len(records)} transactions into MongoDB!")
else:
    print("❌ shared-data/transactions.csv not found!")

print("\n🚀 Database seeding complete! Refresh your Vercel dashboard to see the network!")
