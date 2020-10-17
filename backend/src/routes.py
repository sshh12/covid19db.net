"""
Defines the valid routes for the backend server.
"""
from flask import current_app as app


@app.route("/")
def hello():
    return "Hello World!"
