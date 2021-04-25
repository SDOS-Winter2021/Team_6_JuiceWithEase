from django.http import HttpResponseRedirect
from .settings import STATIC_URL

def getHome(request):
    return HttpResponseRedirect(f'http://localhost:8000/{STATIC_URL}index.html')