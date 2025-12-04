from datetime import datetime
from rest.serializers import TodoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todos_collection = db["todos"]   



class TodoListView(APIView):


    def get(self, request):
        try:
            items = list(todos_collection.find())
            
            for item in items:
                item["id"] = str(item["_id"])

            serializer = TodoSerializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "Failed to fetch todos", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    def post(self, request):
        serializer = TodoSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        doc = {
            "title": data["title"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        try:
            result = todos_collection.insert_one(doc)
            doc["_id"] = result.inserted_id
            doc["id"] = str(result.inserted_id)

            response_serializer = TodoSerializer(doc)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": "Failed to create todo", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
