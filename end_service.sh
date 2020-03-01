#!/bin/bash

cd ./pipeline
python3 queue_cleaner.py &
fuser -k 6060/tcp
