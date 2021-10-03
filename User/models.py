from django.db import models

# Create your models here.
class Users(models.Model):
    class Meta:
        managed = True
        db_table = 'users'
        
    id = models.AutoField(primary_key=True)
    username = models.CharField("username", unique=True, max_length=100)
    password = models. CharField("password", max_length=100)
    balance = models.DecimalField("balance", max_digits=20, decimal_places=10, default=0)

