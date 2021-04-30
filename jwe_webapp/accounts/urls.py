from django.urls import path
from . import views

urlpatterns = [
    path("activate/<str:uid>/<str:token>", views.getActivation),
    path("password/reset/confirm/<str:uid>/<str:token>", views.resetPassword),
    path("user/address", views.UserAddressAPI.as_view()),
]
