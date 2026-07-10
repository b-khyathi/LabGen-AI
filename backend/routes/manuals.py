from flask import Blueprint, request, jsonify
from datetime import datetime

from middleware.auth import token_required

from models.manual import Manual

manual_bp = Blueprint("manual", __name__)

@manual_bp.route("/manuals", methods=["POST"])
@token_required
def save_manual(current_user):

    data = request.json

    result = Manual.create({
        "userId": str(current_user["_id"]),
        "title": data.get("title"),
        "course": data.get("course"),
        "subject": data.get("subject"),
        "experiment": data.get("experiment"),
        "difficulty": data.get("difficulty"),
        "equipment": data.get("equipment"),
        "content": data.get("content"),
        "createdAt": datetime.utcnow()
    })

    return jsonify({
        "message": "Manual saved successfully",
        "id": str(result.inserted_id)
    })

@manual_bp.route("/manuals", methods=["GET"])
@token_required
def get_manuals(current_user):

    manuals = Manual.get_by_user(
        str(current_user["_id"])
    )

    result = []

    for manual in manuals:

        result.append({
            "_id": str(manual["_id"]),
            "title": manual["title"],
            "course": manual["course"],
            "subject": manual["subject"],
            "createdAt": manual["createdAt"]
        })

    return jsonify(result)

@manual_bp.route("/manuals/<manual_id>", methods=["GET"])
@token_required
def get_manual(current_user, manual_id):

    manual = Manual.get_one(manual_id)

    if not manual:
        return jsonify({"message": "Not found"}), 404

    return jsonify({
        "_id": str(manual["_id"]),
        "title": manual["title"],
        "course": manual["course"],
        "subject": manual["subject"],
        "experiment": manual.get("experiment", ""),
        "difficulty": manual.get("difficulty", ""),
        "equipment": manual.get("equipment", ""),
        "content": manual["content"]
    })

@manual_bp.route("/manuals/<manual_id>", methods=["DELETE"])
@token_required
def delete_manual(current_user, manual_id):

    Manual.delete(manual_id)

    return jsonify({
        "message": "Manual deleted"
    })