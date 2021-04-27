# Generated by Django 3.1.7 on 2021-04-07 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("orders", "0005_auto_20210407_1719"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="order",
            name="razorpay_orderID",
        ),
        migrations.AlterField(
            model_name="order",
            name="razorpay_paymentID",
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name="order",
            name="razorpay_signature",
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
