#!/bin/bash
service redis_6379 start
service mongod start

pip install -r requirements.txt

cd pipeline
python3 news_monitor.py &
python3 news_fetcher.py &
python3 news_deduper.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

killall python3
