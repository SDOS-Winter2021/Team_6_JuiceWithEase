from django.http import HttpResponseRedirect
from .settings import STATIC_URL


def getHome(request):
    return HttpResponseRedirect(f"{STATIC_URL}index.html")
