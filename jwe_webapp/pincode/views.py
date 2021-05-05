from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.decorators import api_view
from .models import Pincode
from .serializers import PincodeSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def get_pincodes(request):
    """
    Returns the serviciable pincodes from the database
    """ 
    serv_pins = Pincode.objects.filter(serviceable=True)
    print(serv_pins)
    serializer = PincodeSerializer(serv_pins, many=True)
    print(serializer.data)
    return Response(serializer.data)
