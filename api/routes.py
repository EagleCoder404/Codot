from typing import Dict
from flask import g
from flask.helpers import make_response
from api import app, db, auth
from flask import request, abort, json, jsonify, Response
from api.models import FormSubmission, User, EasyForm, Story, ConversationSnippet, Choice, Pathstone
from api.lib.parse_story import parse

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
    for story in Story.query.all():
        form_entries.append({"id":story.id, "heading":story.name, "description":"", "type":"story"})
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

def getUserSubmissions(id):
    user = User.query.get(id)
    if user is None:
        return []
    form_data = []
    for form_submission in user.user_submissions:
        form = form_submission.form_type
        form_blueprint = json.loads(form.form_blueprint)
        if form_blueprint['type'] == 'normal':
            continue
        else:
            answers = json.loads(form_submission.answers)['answers']
            form_blueprint = form_blueprint['formEntries']
            form_data.append( {"form_blueprint":form_blueprint, "answers":answers} )
    return form_data

@app.route("/api/user_data", methods=['GET'])
@auth.login_required
def get_user_data():
    users = User.query.all()
    user_data = []
    for user in users:
        user_form_data = getUserSubmissions(user.id)
        user_data.append( {"user_id":user.id, "username":user.username, "user_form_data":user_form_data} )
    return {"data":user_data}

@app.route("/story/parse", methods=["POST"])
def codot():
    story_name = request.form['story_name'] or "Default Story Name"
    story_file = request.files['story_file']
    choices, edge_text, conversation_text = parse(story_file)
    the_story = Story(name=story_name)
    ConversationSnippetModels = {}

    for (cid, text) in conversation_text.items():
        ConversationSnippetModels[cid] = ConversationSnippet(cid=cid, text=text, story=the_story)
        db.session.add(ConversationSnippetModels[cid])
    print("Done With Conversation")

    for from_id, to_id in choices:
        from_conversation_snippet = ConversationSnippetModels.get(from_id, None)
        to_conversation_snippet = ConversationSnippetModels.get(to_id, None)
        text=edge_text.get(to_id, None)

        choice = Choice(text=text)
        from_conversation_snippet.choices.append(choice)
        choice.to = to_conversation_snippet
    print("Done with edges")
    db.session.commit()
    return "YeeHaw"

# @app.route("/api/story/<story_id>/cid/<conversation_id>")
# @app.route("/api/story/<story_id>")
# def get_cid(story_id, conversation_id=None):
#     if conversation_id is None:
#         conversation_id=0
#     story = Story.query.get(story_id)
#     if story is None:
#         return make_response({"msg":"story not found"}, 404)
    
#     conversation = ConversationSnippet.query.with_parent(story).filter_by(cid=conversation_id).first()
#     main_text = conversation.text
#     choices = []
#     for choice in conversation.choices:
#         next_cid = None
#         if choice.to is not None:
#             next_cid = choice.to.cid
#         choices.append({'id':next_cid, "text": choice.text})
#     return make_response({"mainText":main_text, "choices":choices}, 200)

@app.route("/api/story/<story_id>/cid/<conversation_id>")
@app.route("/api/story/<story_id>")
@auth.login_required
def get_cid(story_id, conversation_id=None):

    story = Story.query.get(story_id)
    if story is None:
        return make_response({"msg":"story not found"}, 404)
    cid=0
    if conversation_id is None:
        choice = g.user.story_choices.filter(Pathstone.convo_snip.has(ConversationSnippet.story_id==story_id)).order_by(Pathstone.timestamp.desc()).first()
        if choice is None:
            cid=0
        else:
            cid=choice.convo_snip.cid
    else:
        cid=conversation_id
    conversation = ConversationSnippet.query.with_parent(story).filter_by(cid=cid).first()
    main_text = conversation.text
    choices = []
    for choice in conversation.choices:
        next_cid = None
        if choice.to is not None:
            next_cid = choice.to.cid
        choices.append({'id':next_cid, "text": choice.text})
    if conversation_id is not None:
        pathstone = Pathstone(convo_snip=conversation, user=g.user)
        db.session.add(pathstone)
        db.session.commit()
    return make_response({"mainText":main_text, "choices":choices}, 200)

@app.route("/api/story/<story_id>/reset")
@auth.login_required
def reset_story(story_id):
    # Pathstone.query.filter(Pathstone.convo_snip.has(ConversationSnippet.story_id==story_id), Pathstone.user_id==g.user.id).delete()
    stones = Pathstone.query.with_parent(g.user).filter(Pathstone.convo_snip.has(Pathstone.convo_snip.has(ConversationSnippet.story_id==story_id))).all()
    for x in stones:
        print(x)
        db.session.delete(x)
    db.session.commit()
    return make_response({"msg":"done"}, 200)