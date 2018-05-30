import json
import os
import sys

from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer
from bson.json_util import dumps

# import utils packages
sys.path.append(os.path.join(os.path.dirname(__file__), 'utils'))
import mongodb_client


SERVER_HOST = 'localhost';
SERVER_PORT = 4040;

def add(a, b):
  print("Add is called with %d and %d " %(a, b))
  return a + b

def get_one_news():
  print("get_one_news is called.")
  news = mongodb_client.get_db()['news'].find_one()
  return json.loads(dumps(news))

RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(add, 'add')
RPC_SERVER.register_function(get_one_news, 'get_one_news')
print("Starting RPC server")

RPC_SERVER.serve_forever()
