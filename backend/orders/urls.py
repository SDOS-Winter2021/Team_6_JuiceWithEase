from django.urls import path
from . import views 

urlpatterns = [
    path("checkout/",views.addOrderItems,name= "addItems"),
]