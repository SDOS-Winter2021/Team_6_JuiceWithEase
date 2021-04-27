from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

from jwe.settings import STATIC_URL, SITE_URL


def getActivation(req, uid, token):
    return HttpResponseRedirect(
        f"{SITE_URL}{STATIC_URL}activate.html?uid={uid}&token={token}"
    )
