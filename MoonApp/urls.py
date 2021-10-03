from django.urls import path
from . import views

app_name = 'botapi'

urlpatterns = [
    path(r'start', views.StartAPIView.as_view(), name='start'),
    path(r'stop', views.StopAPIView.as_view(), name='stop'),
    path(r'fetchtrades', views.FetchTradeAPIView.as_view(), name='fetchtrades'),
    path(r'inserttrade', views.InsertTradeAPIView.as_view(), name='inserttrade'),
    path(r'lasttrade', views.LastTradeAPIVie.as_view(), name='lasttrade')
]
