"""News fetcher: dedupe etc."""
import json
import os
import sys

from newspaper import Article

sys.path.append(os.path.join(os.path.dirname(__file__), '../backend_server/', 'utils'))

from cloudAMQP_client import CloudAMQPClient

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://thclcviw:nK7rq3q6zh3_BhTLtt0BA-6Y1cIapo6m@emu.rmq.cloudamqp.com/thclcviw"
DEDUPE_NEWS_TASK_QUEUE_NAME = "top-new-DEDUPE_NEWS_TASK_QUEUE_NAME"
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://qfgxyvvk:iY2b-CHr35Zc4PYgQZJkbBsgzmTMWf3Y@emu.rmq.cloudamqp.com/qfgxyvvk"
SCRAPE_NEWS_TASK_QUEUE_NAME = "top-news-SCRAPE_NEWS_TASK_QUEUE"

SLEEP_TIME_IN_SECONDS = 5

dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)


def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print('message is broken')
        return

    task = msg
    text = None

    article = Article(task['url'])
    article.download()
    article.parse()
    task['text'] = article.text

    dedupe_news_queue_client.sendMessage(task)

while True:
    if scrape_news_queue_client is not None:
        msg = scrape_news_queue_client.getMessage()
        if msg is not None:
            # Parse and process the task
            try:
                handle_message(msg)
            except Exception as e:
                print(e)
                pass
        scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
