from flask import Blueprint, request, jsonify
from datetime import datetime

from middleware.auth import token_required
from models.chat import Chat

chat_bp = Blueprint("chat", __name__)