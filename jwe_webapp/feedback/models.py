from django.db import models

# Create your models here.
class Feedback(models.Model):
    username = models.CharField(max_length=200, null=True, blank=False)
    useremail = models.CharField(max_length=200, null=True, blank=False)
    subject = models.TextField(max_length=200, null=True, blank=False)
    message = models.TextField(null=True, blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False, blank=False)

    def __str__(self):
        return str(self.subject) + " by " + str(self.username)
