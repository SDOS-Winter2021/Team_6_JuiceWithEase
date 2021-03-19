from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm,AuthenticationForm
from .models import UserAccount
from django.contrib.auth import authenticate

class UserAccountCreationForm(UserCreationForm):
    class Meta:
        model = UserAccount
        fields = ('email',"first_name","last_name","password1","password2","phone")

# class UserAccountChangeForm(UserChangeForm):

#     class Meta:
#         model = UserAccount
#         fields = ('username', 'email')

class UserLoginForm(forms.ModelForm):
    email = forms.CharField(label ="Email",widget=forms.TextInput(attrs={
        'class':'form-control',
        'id':"name",
        'placeholder':'Email Address'
    }))
    password = forms.CharField(label="Password",widget=forms.PasswordInput(attrs={
        'class':'form-control',
        'placeholder':'Password'
    }))
    class Meta:
        model = UserAccount
        fields = ("email","password")

    def clean(self):
        email = self.cleaned_data["email"]
        password = self.cleaned_data["password"]

        if not authenticate(email = email,password = password):
            raise forms.ValidationError("Invalid Credentials")