# Generated by Django 3.1.7 on 2021-04-07 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='payment_status',
        ),
        migrations.RemoveField(
            model_name='order',
            name='razorpay_orderID',
        ),
        migrations.RemoveField(
            model_name='order',
            name='razorpay_paymentID',
        ),
        migrations.RemoveField(
            model_name='order',
            name='razorpay_signature',
        ),
    ]
