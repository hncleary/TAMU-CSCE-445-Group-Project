
# from https://github.com/Moesif/moesif-flask-mongo-example/blob/master/config.py

from pymongo import MongoClient

DATABASE = MongoClient()['restfulapi'] # DB_NAME
DEBUG = True
client = MongoClient('localhost', 27017)