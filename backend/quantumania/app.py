from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://quantumania:quantumania@db/quantumania'

@app.route('/api')
def hello():
    return 'Hello, World!'


