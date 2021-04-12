from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

from jwe.settings import STATIC_URL


def getActivation(req, uid, token):
    return HttpResponseRedirect(f'{STATIC_URL}activate.html?uid={uid}&token={token}')
