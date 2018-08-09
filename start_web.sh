#!/bin/bash
fuser -k 3000/tcp
fuser -k 4040/tcp
fuser -k 5050/tcp
fuser -k 6060/tcp

service redis_6379 start
# service mongod start

cd backend_server
python3 service.py&

cd ../news_recommendation_service
python3 click_log_processor.py&
python3 recommendation_service.py&

cd ../pipeline
python3 news_monitor.py &
python3 news_fetcher.py &
python3 news_deduper.py &

cd ../news_topic_modeling_service/server
python3 server.py &

cd ../../web_server/client
# npm install
# npm run watch&

cd ../server
# npm install
npm start &

echo "=================================================="

read -p "PRESS [ANY KEY] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
fuser -k 4040/tcp
fuser -k 5050/tcp
fuser -k 6060/tcp
killall python3
