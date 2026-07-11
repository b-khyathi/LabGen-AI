from config.db import db
from bson import ObjectId

notes = db["notes"]


class Note:

    @staticmethod
    def create(note):
        return notes.insert_one(note)

    @staticmethod
    def get_all():
        return list(
            notes.find().sort("createdAt", -1)
        )

    @staticmethod
    def find_by_user(user_id):
        return list(
            notes.find({"userId": user_id})
            .sort("updatedAt", -1)
        )

    @staticmethod
    def find_by_id(note_id):
        return notes.find_one({"_id": ObjectId(note_id)})

    @staticmethod
    def update(note_id, data):
        return notes.update_one(
            {"_id": ObjectId(note_id)},
            {"$set": data}
        )

    @staticmethod
    def delete(note_id):
        return notes.delete_one({"_id": ObjectId(note_id)})