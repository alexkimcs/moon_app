from django.db import models
from django.apps import apps
import django 
django.setup()
UserModel = apps.get_model('User','Users')

# Create your models here.
class Trades(models.Model):
    class Meta:
        managed = True
        db_table = 'trades'

    trade_id = models.AutoField('id', primary_key=True)
    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    pair = models.CharField('pair', max_length=100)
    time = models.DecimalField('time', max_digits=20, decimal_places=10, default=0)
    trade_type = models.CharField('type', max_length=100)
    order_type = models.CharField('order_type', max_length=100)
    price = models.DecimalField('price', max_digits=20, decimal_places=10, default=0)
    cost = models.DecimalField('cost', max_digits=20, decimal_places=10, default=0)
    fee = models.DecimalField('fee', max_digits=20, decimal_places=10, default=0)
    vol = models.DecimalField('vol', max_digits=20, decimal_places=10, default=0)
    margin = models.DecimalField('margin', max_digits=20, decimal_places=10, default=0)
