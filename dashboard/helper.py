'''
mock data for hour_clicking_number_time_
'''
import redis
from datetime import datetime, timedelta

DEFAULT_REDIS_HOST = 'localhost'
DEFAULT_REDIS_PORT = '6379'

REDIS_HOST = DEFAULT_REDIS_HOST
REDIS_PORT = DEFAULT_REDIS_PORT

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)

DEFAULT_DAY_FORMAT = '%Y-%m-%d' + '_'
DEFAULT_HOUR_FORMAT = '%Y-%m-%d-%H' + '_'
DEFAULT_EXPIRE_SECONDS = 60 * 60

HOUR_CLICKING_NUMBER = 'hour_clicking_number' + '_'

DAILY_ACTIVE_USERS = 'daily_active_users' + '_'
DAILY_ACTIVE_USERS_FREQ = 'daily_active_users_freq' + '_'
DAILY_ACTIVE_NEWS_FREQ = 'daily_active_news_freq' + '_'

def generate_hour_clicking_number(time_delta, val):
    lastHourDateTime = datetime.today() - timedelta(hours = time_delta)

    # format %Y-%m-%d-%H
    hour = lastHourDateTime.strftime(DEFAULT_HOUR_FORMAT)

    # get key
    key = HOUR_CLICKING_NUMBER + hour

    #print(key)
    # if redis_client.get(key) is None:
    redis_client.set(key, val)

def get_previous_week_users():
    res = []
    # get current hour
    for i in range(7):
        res.insert(0, get_daily_active_users(i))
    return res

def generate_daily_active_users(time_delta, val):
    lastDayDateTime = datetime.today() - timedelta(days = time_delta)

    day = lastDayDateTime.strftime(DEFAULT_DAY_FORMAT)
    key = DAILY_ACTIVE_USERS + day

    print(key)
    if redis_client.get(key) is None:
        redis_client.set(key, val)

def generate_news_category(key, val):
    if redis_client.get(key) is None:
        redis_client.set(key, val)


news_category = [
    "Colleges & Schools",
    "Environmental",
    "World",
    "Entertainment",
    "Media",
    "Politics & Government",
    "Regional News",
    "Religion",
    "Sports",
    "Technology",
    "Traffic",
    "Weather",
    "Economic & Corp",
    "Advertisements",
    "Crime",
    "Other",
    "Magazine",
    "Education"
]



if __name__ == "__main__":

    for i in news_category:
        generate_news_category(i.lower(), 10)

    for i in range(7):
        generate_daily_active_users(i, (i * 99) % 1024)

    for i in range(23):
        generate_hour_clicking_number(i, 99 * i % 78)
