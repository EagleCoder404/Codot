from flask import Flask, json, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app,db)
auth = HTTPBasicAuth()

CORS(app)

from api import routes, models