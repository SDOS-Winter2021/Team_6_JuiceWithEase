from django.db import models

# Create your models here.
class Store(models.Model):
    name = models.CharField(max_length=255)
    # address = 
    pincode = models.CharField(max_length=6)
    # admin_id =
    