import requests
from json import loads

NEWS_API_ENDPOINT = "https://newsapi.org/v2/"
NEWS_API_KEY = "4d24257f39a14620bad766d59d5841c0"
ARTICLES_API = "top-headlines"

CNN = 'cnn'
DEFAULT_SOURCE = [CNN]
# SORT_BY_TOP = 'top'

def _buildUrl(endPoint=NEWS_API_ENDPOINT, apiName=ARTICLES_API):
    return endPoint + apiName

def getNewsFromSources(sources=DEFAULT_SOURCE):
    articles = []

    for source in sources:
        payload = { 'apiKey': NEWS_API_KEY,
                    'sources': source
                    # 'sortBy': sortBy
                    }
        # reponse = requests.get(_buildUrl(), params=payload)
        # print(reponse)
        res_json = requests.get(_buildUrl(), params=payload).json()
        print(res_json)
        if (res_json is not None and
            res_json['status'] == 'ok'):

            for news in res_json['articles']:
               news['source'] = news['source']['name']

            articles.extend(res_json['articles'])

    return articles
