from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ProductCategory(models.Model):
    name = models.CharField(max_length=200, null=True, blank=False)
    description = models.TextField(null=True, blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False, blank=False)

    def __str__(self):
        return self.name


class Bottletype(models.Model):
    _id = models.AutoField(primary_key=True, editable=False, blank=False)
    volume = models.IntegerField(null=True, blank=False)

    def __str__(self):
        return str(self.volume) + " ml"


class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=False)
    image = models.ImageField(null=True, blank=True)
    category_Id = models.ForeignKey(
        ProductCategory,
        on_delete=models.CASCADE,
        null=True,
        related_name="category",
        blank=False,
    )
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, blank=False)
    bottle_id = models.ForeignKey(
        Bottletype, on_delete=models.CASCADE, null=True, blank=False
    )
    availability = models.BooleanField(
        null=False, blank=False, default=True, editable=True
    )
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False, blank=False)
    # category = models.TextField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name
