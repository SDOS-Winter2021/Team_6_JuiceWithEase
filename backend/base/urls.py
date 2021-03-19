from django.urls import path
from . import views 

urlpatterns = [
    path("",views.getRoutes,name= "routes"),
    # path("home/",views.getHome,name= "home"),
    # path("aboutus/",views.getAboutUs,name= "about"),
    # path("contactus/",views.getContactUs,name= "contact"),
    # path("subscribe/",views.getSubscribe,name= "subscribe"),
    # path("blog/",views.getBlog,name= "blog"),
    # path("shop/",views.getShop,name= "shop"),
    # path("mycart/",views.getCart,name= "cart"),
    # path("myprofile/",views.getProfile,name= "user"),
    
    # path("user/",views.getUser,name= "user1"),
    # path("checkout/",views.getCheckout,name= "checkout"),
    # path("productdet/",views.getProductDet,name= "productdet"),
    # path("allproducts/",views.getAllProducts,name= "allproducts"),



    path("products/",views.getProducts,name= "products"),
    path("categories/",views.getProductCategories,name= "productcategories"),
    path('product/<int:pk>/',views.getProduct,name= "product"),
    path('categoryfilter/<int:catg>/',views.getProducts_in_Category,name= "productincategory")
]