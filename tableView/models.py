from django.db import models

# Create your models here.
class Pet_Food(models.Model):
    name = models.CharField(max_length=100, default=None)
    brand = models.CharField(max_length=100)
    pet = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=5, decimal_places=2) 