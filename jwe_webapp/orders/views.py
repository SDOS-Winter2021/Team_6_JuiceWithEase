from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product
from .models import Order, OrderItem, ShippingAddress
from base.serializer import ProductSerializer
from .serializers import OrderSerializer

from rest_framework import status
from datetime import datetime

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
import hashlib
import razorpay

key_ID = "rzp_test_VWf3ZGDjgj2udL"
key_secret = "GeZHFqGrTwk7ajAly5MHTX0a"
client = razorpay.Client(auth=(key_ID, key_secret))


@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def addOrderItems(request):
    """Add Items from Cookie to the Database"""
    user = request.user
    data = request.data

    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response(
            {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user, paymentMethod=data["order"]["paymentMethod"], totalPrice=0
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            pinCode=data["shippingAddress"]["pincode"],
        )

        # (3) Create order items and set order to orderItem relationship

        total_price = 0
        for i in orderItems:
            print(i)
            product = Product.objects.get(pk=int(i[0]))
            price = i[1] * product.price
            item = OrderItem.objects.create(
                product=product,
                order=order,
                # name=product.name,
                qty=i[1],
                price=price,
            )
            total_price += price
        # Updating the total_price
        order.totalPrice = total_price
        order.save(update_fields=["totalPrice"])

        order_currency = "INR"
        notes = {"Order ID": order._id}
        print(total_price * 100)
        razorpay_order = client.order.create(
            {
                "amount": int(total_price * 100),
                "currency": order_currency,
                "notes": notes,
                "receipt": str(order._id),
                "payment_capture": "0",
            }
        )
        print(razorpay_order["id"])
        order.razorpay_orderID = razorpay_order["id"]
        order.save(update_fields=["razorpay_orderID"])
        serializer = OrderSerializer(order, many=False)
        # return render(request, 'index.html', {'order':order, 'order_id': razorpay_order['id'], 'orderId':order._id, 'final_price':total_price, 'razorpay_merchant_id':"rzp_test_VWf3ZGDjgj2udL"})

        # return render(request, 'index.html')
        return Response(serializer.data)


@csrf_exempt
@api_view(["POST"])
def payment_verify(request):
    """
    The method verifies the payment from razorpay and creates the order in the database.
    Razorpay returns 3 parameters: razorpay_payment_id, razorpay_order_id and rpay_signature.
    These credentials need to be verified before adding the order
    to the database. If verified successfully, the order is added to the database.
    """
    if request.method == "POST":
        print("reached here")
        # print()
        print(request.data)
        # print(request.__dict__)
        print(request.data["rpay_payment_id"])
        print(request.data["rpay_order_id"])
        print(request.data["rpay_signature"])
        print(request.data["Order_ID"])
        # return
        params_dict = {
            "razorpay_order_id": request.data["rpay_order_id"],
            "razorpay_payment_id": request.data["rpay_payment_id"],
            "razorpay_signature": request.data["rpay_signature"],
        }
        v = client.utility.verify_payment_signature(params_dict)
        # generate = hashlib.sha256()
        print(v)
        if v:
            print("Unsuccessful")
            return HttpResponse("Payment was Unsuccessfull", status=403)
        print("Successful Payment")
        order = Order.objects.get(razorpay_orderID=request.data["rpay_order_id"])
        order.isPaid = True
        order.payment_status = 1
        order.razorpay_paymentID = request.data["rpay_payment_id"]
        order.razorpay_signature = request.data["rpay_signature"]
        order.save(
            update_fields=[
                "isPaid",
                "payment_status",
                "razorpay_paymentID",
                "razorpay_signature",
            ]
        )
        serializer = OrderSerializer(order, many=False)
        return JsonResponse(serializer.data, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    """Returns the previous order history of the user"""
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    """Fetches a specific order using the given id"""

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response(
                {"detail": "Not authorized to view this order"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except:
        return Response(
            {"detail": "Order does not exist"}, status=status.HTTP_400_BAD_REQUEST
        )
