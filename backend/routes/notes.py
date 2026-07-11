from flask import Blueprint, request, jsonify
from datetime import datetime

from middleware.auth import token_required
from models.note import Note

notes_bp = Blueprint("notes", __name__)

@notes_bp.route("/notes", methods=["POST"])
# @token_required
def create_note(current_user = None):

    data = request.json

    note = {
        "userId": str(current_user["_id"]) if current_user else None,
        "title": data.get("title"),
        "content": data.get("content"),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }

    result = Note.create(note)

    return jsonify({
        "id": str(result.inserted_id)
    }), 201

@notes_bp.route("/notes", methods=["GET"])
# @token_required
def get_notes(current_user = None):

    # notes = Note.find_by_user(str(current_user["_id"]))
    notes = Note.get_all()

    result = []

    for note in notes:
        result.append({
            "id": str(note["_id"]),
            "title": note["title"],
            "content": note.get("content", ""),
            "createdAt": note["createdAt"],
            "updatedAt": note["updatedAt"]
        })

    return jsonify(result)

@notes_bp.route("/notes/<note_id>", methods=["GET"])
# @token_required
def get_note(note_id, current_user = None):

    note = Note.find_by_id(note_id)

    if not note:
        return jsonify({"message": "Note not found"}), 404

    # if note["userId"] != str(current_user["_id"]):
    #     return jsonify({"message": "Unauthorized"}), 403

    return jsonify({
        "id": str(note["_id"]),
        "title": note["title"],
        "content": note.get("content", ""),
        "createdAt": note["createdAt"],
        "updatedAt": note["updatedAt"]
    })

@notes_bp.route("/notes/<note_id>", methods=["PUT"])
# @token_required
def update_note(note_id, current_user = None):

    note = Note.find_by_id(note_id)

    if not note:
        return jsonify({"message": "Note not found"}), 404

    # if note["userId"] != str(current_user["_id"]):
    #     return jsonify({"message": "Unauthorized"}), 403

    data = request.json

    Note.update(note_id, {
        "title": data.get("title"),
        "content": data.get("content"),
        "updatedAt": datetime.utcnow()
    })

    return jsonify({
        "message": "Note updated successfully"
    })

@notes_bp.route("/notes/<note_id>", methods=["DELETE"])
# @token_required
def delete_note(note_id, current_user = None):

    note = Note.find_by_id(note_id)

    if not note:
        return jsonify({"message":"Note not found"}),404

    # if note["userId"] != str(current_user["_id"]):
    #     return jsonify({"message":"Unauthorized"}),403

    Note.delete(note_id)

    return jsonify({
        "message":"Note deleted successfully"
    })