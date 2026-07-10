from config.db import db

users = db["users"]


class User:

    @staticmethod
    def create(user):
        return users.insert_one(user)

    @staticmethod
    def find_by_email(email):
        return users.find_one({"email": email})

    @staticmethod
    def find_by_id(user_id):
        from bson import ObjectId
        return users.find_one({"_id": ObjectId(user_id)})

    @staticmethod
    def update(user_id, data):
        from bson import ObjectId
        return users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": data}
        )

    @staticmethod
    def delete(user_id):
        from bson import ObjectId
        return users.delete_one({"_id": ObjectId(user_id)})
    
    @staticmethod
    def update(user_id, data):
        from bson import ObjectId

        return users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": data}
        )


    @staticmethod
    def find_by_id(user_id):
        from bson import ObjectId
        return users.find_one({"_id": ObjectId(user_id)})