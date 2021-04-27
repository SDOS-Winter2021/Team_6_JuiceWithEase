from django.contrib import admin
from .models import *

# Register your models here.
class PincodeAdmin(admin.ModelAdmin):
    list_display = ["pincode", "serviceable"]
    list_filter = ["serviceable"]


admin.site.register(Pincode, PincodeAdmin)
