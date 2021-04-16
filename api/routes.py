from typing import Dict
from flask import g
from flask.helpers import make_response
from api import app, db, auth
from flask import request, abort, json, jsonify, Response
from api.models import FormSubmission, User, EasyForm

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# @app.errorhandler(401)
# def handler_401(error):
#     return Response("User not authenticated", 401)

@app.route("/api/test")
def test():
    return ({"msg":"working"})

@app.route("/api/resource")
@auth.login_required
def resource():
    return {"msg":"Here you go Sa"}


@app.route("/api/login")
@auth.login_required
def login():
    token = g.user.generate_auth_token()
    return {'token':token.decode('ascii'), "duration":3600, "user_type":g.user.atype}

@app.route("/api/register", methods=['POST'])
def register():
    print(request.get_json())
    username = request.json.get('username')
    password = request.json.get('password')

    if username is None or password is None:
        return make_response({"msg":"no data recived"},400)

    if User.query.filter_by(username=username).first() is not None:
        return make_response({"msg":"duplicate user"}, 400)

    user = User(username = username)
    user.hash_password(password)

    db.session.add(user)
    db.session.commit()

    return {'msg':'registered','username':username}


@app.route("/api/create", methods=['POST'])
@auth.login_required
def create():
    if g.user.atype != 'admin':
        return make_response("users not allowed", 401)
    form_blueprint = json.dumps(request.json)
    newForm = EasyForm(form_blueprint=form_blueprint, author=g.user)
    db.session.add(newForm)
    db.session.commit()
    return {"msg":"success"}

@app.route("/api/form/all", methods=["GET"])
def get_all_forms():
    form_entries = [] 
    for form_entry in EasyForm.query.all():
        form_blueprint = json.loads(form_entry.form_blueprint)
        heading = form_blueprint['heading']
        description = form_blueprint['description']
        id = form_entry.id
        form_entries.append({'id':id, "heading":heading, "description":description})
    return jsonify(form_entries)

@app.route("/api/form/get/<id>", methods=["GET"])
@auth.login_required
def get_form(id):
    form = EasyForm.query.get(id)
    if form is None:
        return make_response("form not found",404)
    else:
        return form.form_blueprint

@app.route("/api/form/fill/<id>", methods=['POST'])
@auth.login_required
def fill_form(id):
    form_answers = None
    if request.is_json:
        form_answers = request.get_json()
    if form_answers is None:
       return  make_response("Invalid Parameter", 400)

    #convert to suitable form storable in database ORM
    form_answers = json.dumps(form_answers)

    form_type = EasyForm.query.get(id)
    if form_type is None:
       return make_response("Invalid Form Id",400)

    user = g.user

    #if resubmitting update old submission, if not create a new submission
    previous_submissions = g.user.user_submissions.filter_by(form_parent_id=id).first()
    sub = None
    if previous_submissions is not None:
        previous_submissions.answers = form_answers
        sub = previous_submissions
    else:
        sub = FormSubmission(answers=form_answers, user=user, form_type=form_type)

    db.session.add(sub)
    db.session.commit()
    return make_response({"msg":"added succesfully"},200)

@app.route("/api/form/<id>/submissions", methods=['GET'])
@auth.login_required
def get_all_submissions(id):
    if g.user.atype != 'admin':
        return make_response("users not allowed", 401)    
    form = EasyForm.query.get(id)
    if form is None:
        return make_response("invalid id", 400)
    form_submissions = []
    questions = json.loads(form.form_blueprint)['formEntries']
    for form_submission in form.form_submissions.all():
        username = form_submission.user.username
        answers = json.loads(form_submission.answers)
        form_submissions.append({"username":username, "submission_data":answers})
        
    return {"form_submissions":form_submissions, "questions":questions}
