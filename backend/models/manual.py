from config.db import db
from bson import ObjectId

manuals = db["manuals"]


class Manual:

    @staticmethod
    def create(data):
        return manuals.insert_one(data)

    @staticmethod
    def get_by_user(user_id):
        return list(
            manuals.find({"userId": user_id})
            .sort("createdAt", -1)
        )

    @staticmethod
    def get_one(manual_id):
        return manuals.find_one({"_id": ObjectId(manual_id)})

    @staticmethod
    def delete(manual_id):
        return manuals.delete_one({"_id": ObjectId(manual_id)})