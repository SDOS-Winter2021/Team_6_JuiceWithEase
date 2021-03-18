from django.urls import path
from . import views 

urlpatterns = [
    path("",views.getRoutes,name= "routes"),
    path("home/",views.getHome,name= "home"),
    path("products/",views.getProducts,name= "products"),
    path("categories/",views.getProductCategories,name= "productcategories"),
    path('product/<int:pk>/',views.getProduct,name= "product"),
    path('categoryfilter/<int:catg>/',views.getProducts_in_Category,name= "productincategory")
]