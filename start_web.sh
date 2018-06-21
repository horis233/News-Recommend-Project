#!/bin/bash

fuser -k 3000/tcp
fuser -k 4040/tcp
fuser -k 5050/tcp

service redis_6379 start
service mongod start



cd backend_server
python3 service.py&

cd ../news_recommendation_service
python3 click_log_processor.py&
python3 recommendation_service.py&

cd ../web_server/client
# npm install
# npm run build&

cd ../server
# npm install
npm start&

echo "=================================================="

read -p "PRESS [ANY KEY] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)
fuser -k 3000/tcp
fuser -k 4040/tcp
fuser -k 5050/tcp
killall python3
