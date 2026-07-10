from flask import Blueprint, jsonify, request

from middleware.auth import token_required

from models.user import User

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/profile", methods=["GET"])
@token_required
def get_profile(current_user):

    return jsonify({
        "name": current_user["name"],
        "email": current_user["email"],
        "university": current_user.get("university", ""),
        "branch": current_user.get("branch", ""),
        "year": current_user.get("year", ""),
        "bio": current_user.get("bio", "")
    })

@profile_bp.route("/profile", methods=["PUT"])
@token_required
def update_profile(current_user):

    data = request.json

    User.update(
        str(current_user["_id"]),
        {
            "name": data.get("name"),
            "university": data.get("university"),
            "branch": data.get("branch"),
            "year": data.get("year"),
            "bio": data.get("bio")
        }
    )

    return jsonify({
        "message": "Profile updated successfully"
    })

