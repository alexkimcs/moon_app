from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path(r'create', views.CreateUserAPIView.as_view(), name='create'),
    path(r'login', views.LoginUserAPIView.as_view(), name='login'),
    path(r'balance', views.UserBalanceAPIView.as_view(), name='balance'),
    path('updatebalance', views.UpdateBalanceAPIView.as_view(), name='updatebalance'),
    path('getuserid', views.GetUserIDView.as_view(), name='getuserid'),
    path('setuserid', views.SetUserIDView.as_view(), name='setuserid'),
    path('deleteuser', views.DeleteUserIDView.as_view(), name='setuserid')
]
