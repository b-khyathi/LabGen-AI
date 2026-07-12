from flask import Flask, request, jsonify
from flask_cors import CORS

from config.db import db

from services.ai import (
    generate_lab_manual,
    chat_with_ai,
    improve_notes,
    summarize_notes,
)

from routes.auth import auth


from dotenv import load_dotenv

from middleware.auth import token_required

from routes.notes import notes_bp

from routes.resources import resources_bp

from routes.profile import profile_bp

from routes.manuals import manual_bp

load_dotenv()
 
app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "https://lab-gen-ai-khyathi.netlify.app",
])

app.register_blueprint(notes_bp)
app.register_blueprint(resources_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(manual_bp)

@app.route("/")
def home():
    return {"message": "LabGen AI Backend Running"}


@app.route("/generate", methods=["POST"])
def generate():

    data = request.json

    course = data.get("course")
    subject = data.get("subject")
    experiment = data.get("experiment")
    difficulty = data.get("difficulty")
    
    equipment = data.get("equipment")

    result = generate_lab_manual(
        course,
        subject,
        experiment,
        difficulty,
        equipment
    )

    return jsonify({
        "manual": result
    })

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    message = data.get("message")
    manual = data.get("manual")
    history = data.get("history", [])

    answer = chat_with_ai(message, manual, history)

    return jsonify({
        "response": answer
    })

@app.route("/improve", methods=["POST"])
def improve():

    data = request.json

    text = data.get("text", "")

    improved = improve_notes(text)

    return jsonify({
        "result": improved
    })


@app.route("/summarize", methods=["POST"])
def summarize():

    data = request.json

    text = data.get("text", "")

    summary = summarize_notes(text)

    return jsonify({
        "result": summary
    })



@app.route("/profile", methods=["GET"])
@token_required
def profile(current_user):
    return jsonify({
        "name": current_user["name"],
        "email": current_user["email"]
    })

app.register_blueprint(auth)

if __name__ == "__main__":
    app.run(debug=True)