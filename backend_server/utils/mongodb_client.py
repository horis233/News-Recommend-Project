from pymongo import MongoClient

MONGO_DB_URL = "mongodb://admin:letmein123@ds045897.mlab.com:45897/news"
MONGO_DB_HOST = "ds045897.mlab.com"
MONGO_DB_PORT = 45897

DB_NAME = "news"
DB_USER = "admin"
DB_PASS = "letmein123"

client = MongoClient(MONGO_DB_HOST, MONGO_DB_PORT, retryWrites = False)

def get_db(db = DB_NAME):
  db = client[db]
  db.authenticate(DB_USER, DB_PASS)
  return db
