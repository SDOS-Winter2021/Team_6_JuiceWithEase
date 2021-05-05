from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.decorators import api_view
from .models import Feedback
from .serializers import FeedbackSerializer

# Create your views here.


@api_view(["POST"])
def addfeedback(request):
    """
    Saves the feedback into the database. Attributes required are \n
    :Username:  The name of the feedback submitter \n
    :Useremail: The email id of the feedback submitter \n
    :Subject: The subject of the feedback   \n
    :Message: The content of the feedback   \n
    """
    fb = Feedback.objects.create(
        username=request.data["username"],
        useremail=request.data["useremail"],
        subject=request.data["subject"],
        message=request.data["message"],
    )
    fb.save()
    serializer = FeedbackSerializer(fb, many=False)
    return HttpResponse(serializer)
