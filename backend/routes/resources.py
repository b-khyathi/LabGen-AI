from flask import Blueprint

resources_bp = Blueprint("resources", __name__)

from flask import request, jsonify
from middleware.auth import token_required
from models.resource import Resource

from datetime import datetime
import os

from werkzeug.utils import secure_filename


import uuid

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@resources_bp.route("/resources", methods=["POST"])
@token_required
def upload_resource(current_user):

    if "file" not in request.files:
        return jsonify({"message": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"message": "No file selected"}), 400

    original_name = secure_filename(file.filename)

    filename = f"{uuid.uuid4().hex}_{original_name}"

    filepath = os.path.join(UPLOAD_FOLDER, filename)

    file.save(filepath)

    Resource.create({
        "userId": str(current_user["_id"]),
        "fileName": original_name,
        "storedName": filename,
        "path": filepath,
        "size": os.path.getsize(filepath),
        "uploadedAt": datetime.utcnow()
    })

    return jsonify({
        "message": "File uploaded successfully"
    }), 201

@resources_bp.route("/resources", methods=["GET"])
@token_required
def get_resources(current_user):

    resources = Resource.find_by_user(str(current_user["_id"]))

    result = []

    for resource in resources:

        result.append({
            "id": str(resource["_id"]),
            "fileName": resource["fileName"],
            "path": resource["path"],
            "size": resource["size"],
            "uploadedAt": resource["uploadedAt"]
        })

    return jsonify(result)

@resources_bp.route("/resources/<resource_id>", methods=["DELETE"])
@token_required
def delete_resource(current_user, resource_id):

    resource = Resource.find_by_id(resource_id)

    if not resource:
        return jsonify({"message": "Resource not found"}), 404

    if resource["userId"] != str(current_user["_id"]):
        return jsonify({"message": "Unauthorized"}), 403

    if os.path.exists(resource["path"]):
        os.remove(resource["path"])

    Resource.delete(resource_id)

    return jsonify({
        "message": "Resource deleted successfully"
    })