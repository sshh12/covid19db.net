"""
Entrypoint into the backend API.
"""
from covid_app import app, routes


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
