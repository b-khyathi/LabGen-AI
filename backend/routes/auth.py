from flask import Blueprint, request, jsonify
from models.user import users
from werkzeug.security import generate_password_hash
from datetime import datetime

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check if email already exists
    existing = users.find_one({"email": email})

    if existing:
        return jsonify({"message": "Email already exists"}), 400

    # Hash password
    hashed_password = generate_password_hash(password)

    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,

        "profileImage": "",

        "university": "",
        "course": "",
        "year": "",

        "createdAt": datetime.utcnow()
    })

    return jsonify({"message": "User created successfully"}), 201

from werkzeug.security import check_password_hash
import jwt
import os

@auth.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Incorrect password"}), 401

    token = jwt.encode(
        {
            "id": str(user["_id"]),
            "email": user["email"]
        },
        os.getenv("JWT_SECRET"),
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    })