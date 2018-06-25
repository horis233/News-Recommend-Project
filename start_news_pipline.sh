#!/bin/bash
service redis_6379 start
service mongod start
fuser -k 6060/tcp

pip3 install -r requirements.txt

cd pipeline
python3 news_monitor.py &
python3 news_fetcher.py &
python3 news_deduper.py &

cd ../news_topic_modeling_service/server
python3 server.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

killall python3
