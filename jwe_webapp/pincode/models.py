from django.db import models

# Create your models here.
class Pincode(models.Model):
    pincode = models.CharField(max_length=200, null=True, blank=False)
    serviceable = models.BooleanField(
        null=False, blank=False, default=True, editable=True
    )
    _id = models.AutoField(primary_key=True, editable=False, blank=False)

    def __str__(self):
        return str(self.pincode)
