#!/bin/bash
service redis_6379 start

#pip3 install -r requirements.txt

cd ./news_recommendation_service
python3 click_log_processor.py &
python3 recommend_service.py &

cd ../backend_server
python3 service.py &
