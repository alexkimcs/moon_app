from django.shortcuts import render
from django.views import generic
from rest_framework.views import APIView
from rest_framework.response import Response
import bot
from .models import Users
from django.core.serializers.json import Serializer
from django.forms.models import model_to_dict
import simplejson
from django.core.cache import cache

# Create your views here.
class CreateUserAPIView(APIView):
    model = Users
    def post(self, request):
        response = None
        username = request.data["username"]
        password = request.data["password"]
        balance = request.data["balance"]
        try:
            newuser = Users(username=username, password=password, balance=balance).save()
            newest_user = self.model.objects.order_by('-id')[0]
            response = model_to_dict(newest_user)
            response = simplejson.dumps(response, use_decimal=True)
        except Exception as e:
            pass
        return Response(response)

class LoginUserAPIView(APIView):
    model = Users

    def get(self, request):
        # self.http_method_names.append("GET")
        username = request.data["username"]
        password = request.data["password"]
        user = self.model.objects.get(username=username)
        response = False
        if user is not None:
            if user.password == password:
                response = True
        return Response(response)

class UserBalanceAPIView(APIView):
    model = Users
    def post(self, request):
        user_id = request.data['user_id']
        user = self.model.objects.get(id=user_id)
        response = 0
        if user is not None:
            response = user.balance
        return Response(response)


class UpdateBalanceAPIView(APIView):
    model = Users

    def post(self, request):
        user_id = request.data['user_id']
        new_balance = request.data['new_balance']
        user = self.model.objects.get(id=user_id)
        user.balance = new_balance
        user.save()
        return Response(True)


class SetUserIDView(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        cache.set('user_id', user_id, timeout=None)
        return Response(True)

class GetUserIDView(APIView):
    def post(self, request):
        response = cache.get('user_id')
        return Response(response)

class DeleteUserIDView(APIView):
    model = Users
    def post(self, request):
        user_id = request.data['user_id']
        user = self.model.objects.get(id=user_id)
        user.delete()


