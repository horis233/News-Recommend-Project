#!/bin/bash

cd backend_server
python3 service.py&

cd ../news_recommendation_service
python3 click_log_processor.py&
python3 recommend_service.py&

cd ../pipeline
python3 news_monitor.py &
python3 news_fetcher.py &
python3 news_deduper.py &

cd ../news_topic_modeling_service/server
python3 server.py &
