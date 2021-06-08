from api import app, db
from api.models import User, EasyForm, FormSubmission, Choice, Story, Pathstone


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8000")

@app.shell_context_processor
def make_shell_context():
    print("LOL")
    return {'db':db, 'User':User, "EasyForm":EasyForm, "FormSubmission":FormSubmission, "Story":Story, "Choice":Choice, "Pathstrone":Pathstone}