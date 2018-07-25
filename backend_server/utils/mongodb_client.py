from pymongo import MongoClient

MONGO_DB_URL = "mongodb://horis233:horis233@ds029496.mlab.com:29496/horis_tapnews"
MONGO_DB_HOST = "ds029496.mlab.com"
MONGO_DB_PORT = 29496
DB_NAME = "horis_tapnews"
DB_USER = "horis233"
DB_PASS = "horis233"

client = MongoClient(MONGO_DB_HOST, MONGO_DB_PORT)

def get_db(db = DB_NAME):
  db = client[db]
  db.authenticate(DB_USER, DB_PASS)
  return db
