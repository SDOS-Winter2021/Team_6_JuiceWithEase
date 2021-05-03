from django.urls import path
from . import views

urlpatterns = [
    path("checkout/", views.addOrderItems, name="addItems"),
    path("payment_verify/", views.payment_verify, name="paymentVerify"),
    path("myorders/", views.getMyOrders, name="myorders"),
    path("myorder/<str:pk>/", views.getOrderById, name="user-order"),
]
