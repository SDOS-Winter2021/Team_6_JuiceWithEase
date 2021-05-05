from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

from jwe.settings import STATIC_URL, SITE_URL


def getActivation(req, uid, token):
    return HttpResponseRedirect(
        f"{SITE_URL}{STATIC_URL}activate.html?uid={uid}&token={token}"
    )


def resetPassword(req, uid, token):
    return HttpResponseRedirect(
        f"{SITE_URL}{STATIC_URL}reset.html?uid={uid}&token={token}"
    )


from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *


class UserAddressAPI(APIView):
    """
    Returns the Address Details of the Request User if found otherwise returns a 404 Not Found.\n
    The Request must contain a Bearer token
    """

    def get(self, request, *args, **kwargs):
        print("Request", request)
        user = request.user
        print(user)
        # user_id = user.id if user.id else 7
        # user = User.objects.get(pk=user_id)
        user_address = get_object_or_404(UserAddress, user=user)
        user_address = UserAddressSerializer(user_address)
        return Response(user_address.data)

    def put(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        # user_id = user.id if user.id else 7
        # user = User.objects.get(pk=user_id)
        user_address = get_object_or_404(UserAddress, user=user)
        user_address.city = data["city"]
        user_address.pinCode = data["pincode"]
        user_address.address = data["address"]
        user_address.save()
        user_address = UserAddressSerializer(user_address)
        return Response(user_address.data)
