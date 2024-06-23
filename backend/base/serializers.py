from rest_framework import serializers
from .models import School, Kindergarten, SocialChildProject, SocialTeenagerProject, CustomUser,CartItem

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class KindergartenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kindergarten
        fields = '__all__'

class SocialChildProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialChildProject
        fields = '__all__'

class SocialTeenagerProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialTeenagerProject
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'address', 'zip_code')


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('item_type', 'item_id', 'address', 'phone', 'postal_code', 'image')
