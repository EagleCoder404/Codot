from enum import unique
from sys import excepthook

from sqlalchemy.orm import backref
from api import db, auth, app
from flask import g
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

@auth.verify_password
def verify_password(username_or_token, password):
    print(username_or_token)
    token = username_or_token
    user = User.verify_auth_token(token)
    if not user:
        username = username_or_token
        user = User.query.filter_by(username=username).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, index=True, unique=True)
    password_hash = db.Column(db.String(128))
    atype = db.Column(db.String(20), server_default='user')
    forms = db.relationship('EasyForm', backref='author', lazy='dynamic')
    user_submissions = db.relationship("FormSubmission", backref='user', lazy='dynamic')

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)
    
    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)
    
    def generate_auth_token(self, expiration=3600):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({'id':self.id})
    
    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None
        except BadSignature:
            return None
        user = User.query.get(data['id'])
        return user

class EasyForm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    form_blueprint = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    form_submissions = db.relationship("FormSubmission", backref="form_type", lazy="dynamic")

class FormSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answers = db.Column(db.String())
    form_parent_id = db.Column(db.Integer, db.ForeignKey('easy_form.id'))
    submit_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
