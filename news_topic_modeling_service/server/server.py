"""Machine learning RPC server"""
from json import load
import news_classes
import numpy as np
import os
import pandas as pd
import pickle
import sys
import tensorflow as tf
import time

from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer
from tensorflow.contrib.learn.python.learn.estimators import model_fn
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'trainer'))
import news_cnn_model

# with open('../../config.json') as configure_data:
#     cfg = load(configure_data)

learn = tf.contrib.learn

SERVER_HOST = 'localhost'
SERVER_PORT = 6060

MODEL_DIR = '../model'
MODEL_UPDATE_LAG_IN_SECONDS = 10

N_CLASSES = 4

VARS_FILE = '../model/vars'
VOCAB_PROCESSOR_SAVE_FILE = '../model/vocab_processor_save_file'

n_words = 0
MAX_DOCUMENT_LENGTH = 500
vocab_processor = None

classifier = None


def restoreVars():
    """Restore model"""
    with open(VARS_FILE, 'rb') as f:
        global n_words
        n_words = pickle.load(f)

    global vocab_processor
    vocab_processor = learn.preprocessing.VocabularyProcessor.restore(VOCAB_PROCESSOR_SAVE_FILE)


def loadModel():
    """Load model"""
    global classifier
    classifier = learn.Estimator(
        model_fn=news_cnn_model.generate_cnn_model(N_CLASSES, n_words),
        model_dir=MODEL_DIR
    )

    df = pd.read_csv('../data/labeled_news.csv', header=None)

    train_df = df[0:400]
    x_train = train_df[1]
    x_train = np.array(list(vocab_processor.transform(x_train)))
    y_train = train_df[0]
    classifier.evaluate(x_train, y_train)

    print("Model update")


restoreVars()
loadModel()


class ReloadModelHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        """Reload model"""
        print("Model update detected. Loading new model.")
        time.sleep(MODEL_UPDATE_LAG_IN_SECONDS)
        restoreVars()
        loadModel()


observer = Observer()
observer.schedule(ReloadModelHandler(), path=MODEL_DIR, recursive=False)
observer.start()


def classify(text):
    text_series = pd.Series([text])
    predict_x = np.array(list(vocab_processor.transform(text_series)))
    print(predict_x)

    y_predicted = [
        p['class'] for p in classifier.predict(
            predict_x, as_iterable=True
        )
    ]
    print(y_predicted[0])
    topic = news_classes.class_map[str(y_predicted[0])]
    return topic


RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(classify, 'classify')

print("Starting RPC server on %s:%d" % (SERVER_HOST, SERVER_PORT))

RPC_SERVER.serve_forever()
