"""jwe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from .views import getHome
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("", getHome),
    path("", include("base.urls")),
    path("", include("accounts.urls")),
    path("orders/", include("orders.urls")),
    path("feedback/", include("feedback.urls")),
    path("pincode/", include("pincode.urls")),
    path("accounts/", include("accounts.urls")),
    path("docs/", include_docs_urls(title="Juice With Ease Documentation")),
    path(
        "schema",
        get_schema_view(
            title="BlogAPI", description="API for the BlogAPI", version="1.0.0"
        ),
        name="openapi-schema",
    ),
]

# For React URLS. Modify if needed.
# urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name = "index.html"))]
