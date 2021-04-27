from django.urls import path
from . import views

urlpatterns = [
    path("get_pincodes/", views.get_pincodes, name="pincodes"),
]
