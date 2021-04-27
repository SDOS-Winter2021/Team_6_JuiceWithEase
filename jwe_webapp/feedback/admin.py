from django.contrib import admin
from .models import *

# Register your models here.
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ["username", "subject", "createdAt"]


admin.site.register(Feedback, FeedbackAdmin)
