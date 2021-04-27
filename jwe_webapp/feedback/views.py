from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.decorators import api_view
from .models import Feedback
from .serializers import FeedbackSerializer

# Create your views here.


@api_view(["POST"])
def addfeedback(request):
    # print(request.data['username'])
    # print(request.data['useremail'])
    # print(request.data['subject'])
    # print(request.data['message'])
    fb = Feedback.objects.create(
        username=request.data["username"],
        useremail=request.data["useremail"],
        subject=request.data["subject"],
        message=request.data["message"],
    )
    fb.save()
    serializer = FeedbackSerializer(fb, many=False)
    return HttpResponse(serializer)
