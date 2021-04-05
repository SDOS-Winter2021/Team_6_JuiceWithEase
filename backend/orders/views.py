from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product
from .models import Order, OrderItem, ShippingAddress
from base.serializer import ProductSerializer
from .serializers import  OrderSerializer

from rest_framework import status
from datetime import datetime

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['order']['paymentMethod'],
            totalPrice=0
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            pinCode=data['shippingAddress']['pincode'],
        )

        # (3) Create order items and set order to orderItem relationship

        total_price = 0    
        for i in orderItems:
            product = Product.objects.get(_id=int(i[0]))
            price = i[1]*product.price
            item = OrderItem.objects.create(
                product=product,
                order=order,
                # name=product.name,
                qty=i[1],
                price=price,
            )
            total_price+=price
        # Updating the total_price
        order.totalPrice = total_price
        order.save(update_fields=['totalPrice'])

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
