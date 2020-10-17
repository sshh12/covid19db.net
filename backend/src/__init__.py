"""
Sets up the Flask application and the database connection.
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from . import secret

app = Flask(__name__, static_folder="../static")
app.config["SQLALCHEMY_DATABASE_URI"] = secret.DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)
