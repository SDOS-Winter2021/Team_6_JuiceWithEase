from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, ProductCategory
from .serializer import ProductSerializer, ProductCategorySerializer

# Create your views here.
@api_view(["GET","POST","PUT"])
def getRoutes(request):
    routes = [
        "/api/allproducts/",                    #Get request for all products
        "/api/categories/",                     #Get request for all category types
        "/api/products/in<str:catg>",           #Get request for products in category id = catg
        "/api/productsincategory/<str:pk>/",     #Get request for product with id = pk

    ]
    return Response(routes)

@api_view(["GET"])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getProductCategories(request):
    products = ProductCategory.objects.all()
    serializer = ProductCategorySerializer(products,many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)


@api_view(["GET"])
def getProducts_in_Category(request,catg):
    products = Product.objects.filter(category_Id=catg)
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)