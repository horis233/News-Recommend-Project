import os
import sys

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend_server', 'utils'))

from cloudAMQP_client import CloudAMQPClient

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://thclcviw:nK7rq3q6zh3_BhTLtt0BA-6Y1cIapo6m@emu.rmq.cloudamqp.com/thclcviw"
DEDUPE_NEWS_TASK_QUEUE_NAME = "top-new-DEDUPE_NEWS_TASK_QUEUE_NAME"
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://qfgxyvvk:iY2b-CHr35Zc4PYgQZJkbBsgzmTMWf3Y@emu.rmq.cloudamqp.com/qfgxyvvk"
SCRAPE_NEWS_TASK_QUEUE_NAME = "top-news-SCRAPE_NEWS_TASK_QUEUE"
LOG_CLICKS_TASK_QUEUE_URL = "amqp://evvloemh:VyrLUwE7s7DfZat3-y2tTwuQEcejR2VO@emu.rmq.cloudamqp.com/evvloemh"
LOG_CLICKS_TASK_QUEUE_NAME = "LOG_CLICKS_TASK_QUEUE"


def clearQueue(queue_url, queue_name):
    scrape_news_queue_client = CloudAMQPClient(queue_url, queue_name)

    num_of_messages = 0

    while True:
        if scrape_news_queue_client is not None:
            msg = scrape_news_queue_client.getMessage()
            if msg is None:
                print("Cleared %d messages." % num_of_messages)
                return
            num_of_messages += 1


if __name__ == "__main__":
    clearQueue(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)
    clearQueue(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
    clearQueue(LOG_CLICKS_TASK_QUEUE_URL, LOG_CLICKS_TASK_QUEUE_NAME)
