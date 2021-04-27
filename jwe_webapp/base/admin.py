from django.contrib import admin
from .models import *

# Register your models here.

admin.site.site_header = "Juice With Ease - Admin"
admin.site.register(ProductCategory)
admin.site.register(Bottletype)


class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "category_Id"]
    list_filter = ["category_Id"]


admin.site.register(Product, ProductAdmin)
