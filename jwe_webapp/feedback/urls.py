from django.urls import path
from . import views

urlpatterns = [
    path("addfeedback/", views.addfeedback, name="addfeedback"),
]
