from django.urls import path
from . import views 

urlpatterns = [
    path("",views.getRoutes,name= "routes"),
    path("allproducts/",views.getProducts,name= "products"),
    path("categories/",views.getProductCategories,name= "productcategories"),
    path('products/<str:pk>/',views.getProduct,name= "product"),
    path('productsincategory/<str:catg>',views.getProducts_in_Category,name= "productincategory")
]