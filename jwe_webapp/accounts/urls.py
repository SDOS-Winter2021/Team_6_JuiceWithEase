from django.urls import path
from . import views

urlpatterns = [path("activate/<str:uid>/<str:token>", views.getActivation)]
