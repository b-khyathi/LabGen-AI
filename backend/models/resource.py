from config.db import db
from bson import ObjectId

resources = db["resources"]


class Resource:

    @staticmethod
    def create(resource):
        return resources.insert_one(resource)

    @staticmethod
    def find_by_user(user_id):
        return list(resources.find({"userId": user_id}))

    @staticmethod
    def find_by_id(resource_id):
        return resources.find_one({"_id": ObjectId(resource_id)})

    @staticmethod
    def delete(resource_id):
        return resources.delete_one({"_id": ObjectId(resource_id)})