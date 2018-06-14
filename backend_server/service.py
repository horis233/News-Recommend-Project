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

def add(num1, num2):
    """Test Method"""
    print("Add is called with %d and %d " %(num1, num2))
    return num1 + num2

def get_one_news():
    """Get News Method"""
    print("get_one_news is called.")
    return operations.getOneNews()

def get_news_summaries_for_user(user_id, page_num):
    print("get_news_summaries_for_user is called with %s and %s" %(user_id, page_num))
    return operations.getNewsSummariesForUser(user_id, page_num)

def log_news_click_for_user(user_id, news_id):
    print("log_news_click_for_user is called with %s and %s" %(user_id, news_id))
    return operations.logNewsClickForUser(user_id, news_id)

RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(add, 'add')
RPC_SERVER.register_function(get_one_news, 'get_one_news')
print("Starting RPC server")

RPC_SERVER.serve_forever()
