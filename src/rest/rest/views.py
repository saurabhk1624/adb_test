from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todos_collection = db["todos"]   

def serialize(doc):
    return {
        "id": str(doc["_id"]),
        "title": doc.get("title"),
        "created_at": doc.get("created_at"),
        "updated_at": doc.get("updated_at"),
    }


class TodoListView(APIView):


    def get(self, request):
        try:
            items = list(todos_collection.find())
            items = [serialize(item) for item in items]

            return Response(items, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "Failed to fetch todos", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    def post(self, request):
        data = request.data

        # Simple validation
        if "title" not in data or not data["title"]:
            return Response(
                {"error": "title field is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        doc = {
            "title": data["title"],
            "description": data.get("description", ""),
            "completed": data.get("completed", False),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        try:
            result = todos_collection.insert_one(doc)
            doc["_id"] = result.inserted_id

            return Response(serialize(doc), status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": "Failed to create todo", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
