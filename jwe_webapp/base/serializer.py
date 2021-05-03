from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, ProductCategory


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(source="category_Id",read_only=True)
    
    class Meta:
        model = Product
        
        fields = ["name","image","category","category_Id","description","price","bottle_id","availability","createdAt","id"]




    def create(self, validated_data):
        category = validate_data.pop("category_Id")
        print(category)
        product = super().create(validated_data)
        cat = ProductCategory.objects.filter(pk=category)
        product.category_Id.add(cat)
        print(product)
        return product




class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = "__all__"
