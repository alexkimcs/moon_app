import json

from django.shortcuts import render
from django.views import generic
from rest_framework.views import APIView
from rest_framework.response import Response
import bot
from .models import Trades
from django.core.serializers.json import Serializer
from django.forms.models import model_to_dict
import simplejson


class StartAPIView(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        pair = request.data['pair']
        time = request.data['time']
        return Response(bot.go(user_id, pair, time))


class StopAPIView(APIView):
    def post(self, request):
        return Response(bot.stop())


class FetchTradeAPIView(APIView):
    # endpoints to get trades by userID
    model = Trades
    def post(self, request):
        user_id = request.data['user_id']
        queryset = self.model.objects.filter(user_id_id=user_id).values()
        items = list(queryset)
        serialized = simplejson.dumps(items, use_decimal=True)
        return Response(serialized)


class InsertTradeAPIView(APIView):
    model = Trades
    def post(self, request):
        pair = request.data['pair']
        time = request.data['time']
        trade_type = request.data['trade_type']
        order_type = request.data['order_type']
        price = request.data['price']
        cost = request.data['cost']
        fee = request.data['fee']
        vol = request.data['vol']
        margin = request.data['margin']
        user_id_id = request.data['user_id_id']

        trade = Trades(
            pair=pair,
            time=time,
            trade_type=trade_type,
            order_type=order_type,
            price=price,
            cost=cost,
            fee=fee,
            vol=vol,
            margin=margin,
            user_id_id=user_id_id
        ).save()
        return Response(True)


class LastTradeAPIVie(APIView):
    model = Trades

    def post(self, request):
        pair= request.data['pair']
        user_id = request.data['user_id']

        last_trade = model_to_dict(self.model.objects\
            .filter(user_id_id=user_id, pair=pair)\
            .order_by('-time')\
            .first())
        serialized = simplejson.dumps(last_trade, use_decimal=True)
        return Response(serialized)

