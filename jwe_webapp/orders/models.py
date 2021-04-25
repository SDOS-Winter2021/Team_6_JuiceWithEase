from django.db import models
from django.contrib.auth import get_user_model
from base.models import Product
# Setting the Timezone
import pytz
from jwe.settings import TIME_ZONE
tz = pytz.timezone(TIME_ZONE)

User = get_user_model()

class Order(models.Model):
    payment_status_choices = (
        (1, 'SUCCESS'),
        (2, 'FAILURE' ),
        (3, 'PENDING'),
    )
    #status = models.IntegerField(choices = status_choices, default=1)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    payment_status = models.IntegerField(choices = payment_status_choices, default=3)
    createdAt = models.DateTimeField(auto_now_add=True)
    razorpay_orderID = models.CharField(max_length=500, null=True, blank=True)
    razorpay_paymentID = models.CharField(max_length=500, null=True, blank=True)
    razorpay_signature = models.CharField(max_length=500, null=True, blank=True)

    # timeSlot = models.TimeField()
    # deliveryDate = models.DateTimeField()
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return self.createdAt.astimezone(tz).strftime('%B %d, %Y, %I:%M %p')

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    # name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.product.name)

class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    pinCode = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
