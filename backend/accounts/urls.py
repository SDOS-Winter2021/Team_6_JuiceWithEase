from django.urls import path
from accounts.views import *

urlpatterns = [
    path('register/',UserRegistrationView,name="register"),
    path('login/',UserLoginView,name="login"),
]