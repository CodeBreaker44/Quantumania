from flask import Flask, request ,json
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://quantumania:quantumania@db/quantumania'

@app.route('/api')
def hello():
    return 'Hello, World!'

@app.route('/api/password', methods=['POST'])
def password():
    data = request.get_json(force=True)
    print(data)
    return str(type(data)) # returns <class 'dict'>

@app.route('/api/creditcard', methods=['POST'])
def creditcard():
    data = request.get_json(force=True)
    return str(type(data))
