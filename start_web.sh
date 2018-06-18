#!/bin/bash

cd news_recommendation_service
python click_log_processor.py&
python recommendation_service.py&

cd ../web_server/client
npm install
npm run build&

cd ../server
npm install
npm start&

echo "=================================================="

read -p "PRESS [ANY KEY] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)
