from enum import unique
from sys import excepthook

from sqlalchemy.orm import backref
from api import db, auth, app
from flask import g, make_response
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)
from datetime import datetime
@auth.verify_password
def verify_password(username_or_token, password):
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
    user_responses = db.relationship("StoryResponse", backref="user", lazy="dynamic")

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


class Story(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True, default="A New Story")
    
    conversation_snippets = db.relationship("ConversationSnippet", backref="story", lazy='dynamic')
    story_responses = db.relationship("StoryResponse", backref="story", lazy='dynamic', foreign_keys="StoryResponse.story_id")

class ConversationSnippet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cid = db.Column(db.Integer)
    text = db.Column(db.String)

    choices = db.relationship("Choice", backref="from_cs", lazy='dynamic', foreign_keys="Choice.from_id")
    
    story_id = db.Column(db.Integer, db.ForeignKey("story.id"))


class Choice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text= db.Column(db.String)
    
    p1 = db.Column(db.String, default="")
    p2 = db.Column(db.String, default="")
    s1 = db.Column(db.String, default="")
    s2 = db.Column(db.String, default="")
    s3 = db.Column(db.String, default="")
    
    to_id = db.Column(db.Integer, db.ForeignKey("conversation_snippet.id"))
    to = db.relationship("ConversationSnippet", foreign_keys=[to_id]) 

    from_id = db.Column(db.Integer, db.ForeignKey("conversation_snippet.id"))


class StoryResponse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, default="unfinished")
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    pathstones = db.relationship("Pathstone", backref="story_response", lazy='dynamic', foreign_keys="Pathstone.story_response_id")

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    story_id = db.Column(db.Integer, db.ForeignKey("story.id"))

class Pathstone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    choice_id = db.Column(db.Integer, db.ForeignKey("choice.id"))
    choice_taken = db.relationship("Choice", foreign_keys=[choice_id])

    story_response_id = db.Column(db.Integer, db.ForeignKey("story_response.id"))

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    text = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)