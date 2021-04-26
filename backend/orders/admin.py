from django.contrib import admin
from .models import *

# Register your models here.
class OrderItemInLine(admin.TabularInline):
    model = OrderItem


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("product", "order", "qty", "price")
    list_filter = ("order",)


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "createdAt",
        "user",
        "totalPrice",
        "isPaid",
        "isDelivered",
        "payment_status",
    )
    list_filter = ("isDelivered", "payment_status")
    inlines = [OrderItemInLine]


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ShippingAddress)
