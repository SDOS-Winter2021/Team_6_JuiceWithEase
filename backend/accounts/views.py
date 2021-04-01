from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

# class CustomSchemeRedirect(HttpResponsePermanentRedirect):
#     allowed_schemes = ['ftp']
# def redirect(request):
#     return CustomSchemeRedirect('ftp:///Users/soumyadeeppaul/Downloads/Team_6_JuiceWithEase/storefront/activate')
# Create your views here.

def getActivation(req, uid, token):
    return HttpResponseRedirect(f'http://localhost:8080/activate?uid={uid}&token={token}')