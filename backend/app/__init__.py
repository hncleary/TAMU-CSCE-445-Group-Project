"""This is init module."""

# from https://github.com/Moesif/moesif-flask-mongo-example/blob/master/app/__init__.py

from flask import Flask

# Place where app is defined
app = Flask(__name__)

from app import usersData