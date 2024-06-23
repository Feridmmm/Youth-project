from django.contrib import admin
from .models import CustomUser, School, Kindergarten, SocialChildProject, SocialTeenagerProject, CartItem

admin.site.register(CustomUser)
admin.site.register(School)
admin.site.register(Kindergarten)
admin.site.register(SocialChildProject)
admin.site.register(SocialTeenagerProject)
admin.site.register(CartItem)
