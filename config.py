import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL2")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "ajsdkjasdlkasdklasdk;laskd;lsadk;alsdk"