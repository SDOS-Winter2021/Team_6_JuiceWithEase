from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pincode


class PincodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pincode
        fields = ["pincode"]
