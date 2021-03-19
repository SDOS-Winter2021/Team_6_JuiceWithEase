from django.shortcuts import render,redirect
from django.contrib.auth import login,authenticate,logout
from accounts.forms import UserAccountCreationForm,UserLoginForm
from django.http import HttpResponse
from django.contrib.auth.views import logout_then_login
# Create your views here.

def UserRegistrationView(request):
    context = {}
    if request.POST:
        form =  UserAccountCreationForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            account = authenticate(email=email, password=raw_password)
            login(request, account)
            return HttpResponse("Home")
        else:
            context['registration_form'] = form
    else:
        form = UserAccountCreationForm()
        context['registration_form'] = form
    return render(request, 'accounts/register.html',context)

def UserLoginView(request):
    context = {}
    user = request.user
    if user.is_authenticated:
        return logout_then_login(request,'login')
    if request.POST:
        form =  UserLoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password')
            account = authenticate(email=email, password=raw_password)
            if account:
                login(request, account)
                return HttpResponse("Login Succesful")
        else:
            context['login_form'] = form
    else:
        form = UserLoginForm()
        context['login_form'] = form
    return render(request,'accounts/login.html',context)

# def LogoutView(request):
#     logout(request)

# def RegisterationAndLogin(request):
#     if request.method == 'POST':
#         if request.POST["password2"]:
#             UserRegistrationView(request)
#         else:
#             UserLoginView(request)
#     else:
#         return 