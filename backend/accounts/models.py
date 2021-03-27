from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from stores.models import *
# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self,email,password=None,**other_fields):
        if not email:
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email,**other_fields)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self,email,password,**other_fields):
        user = self.create_user(email,password,**other_fields)

        user.is_staff = True
        user.is_superuser = True
        user.access = 0
        user.save()

        return user


class UserAccount(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    access_levels = [
        (2,"NORMAL"),
        (1,"STORE ADMIN"),
        (0,"SUPERUSER"),
    ]
    access = models.PositiveSmallIntegerField(choices=access_levels,default=2)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name","phone"]

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        return self.first_name 

    def __str__(self):
        return self.email

class Store_Admin(UserAccount):
    Store_id = models.ForeignKey(Store,on_delete=models.CASCADE)