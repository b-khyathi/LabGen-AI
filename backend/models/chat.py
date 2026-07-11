from config.db import db
from bson import ObjectId

chats = db["chat_history"]


class Chat:

    @staticmethod
    def create(chat):
        return chats.insert_one(chat)

    @staticmethod
    def get_all():
        return list(
            chats.find().sort("createdAt", -1)
        )

    @staticmethod
    def find_by_user(user_id):
        return list(
            chats.find({"userId": user_id})
            .sort("updatedAt", -1)
        )

    @staticmethod
    def find_by_id(chat_id):
        return chats.find_one({"_id": ObjectId(chat_id)})

    @staticmethod
    def update(chat_id, data):
        return chats.update_one(
            {"_id": ObjectId(chat_id)},
            {"$set": data}
        )

    @staticmethod
    def delete(chat_id):
        return chats.delete_one({"_id": ObjectId(chat_id)})