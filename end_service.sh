#!/bin/bash

cd ./pipeline
pkill -f queue_cleaner.py &

cd ../backend_server
pkill -f service.py&

cd ../news_recommendation_service
pkill -f click_log_processor.py&
pkill -f recommend_service.py&

cd ../pipeline
pkill -f news_monitor.py &
pkill -f news_fetcher.py &
pkill -f news_deduper.py &

cd ../news_topic_modeling_service/server
pkill -f server.py &
