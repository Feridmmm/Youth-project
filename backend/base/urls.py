from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import update_user_view, logout_view, SchoolViewSet, KindergartenViewSet, SocialChildProjectViewSet, SocialTeenagerProjectViewSet, signup_view, login_view, save_item_view

router = DefaultRouter()
router.register(r'schools', SchoolViewSet)
router.register(r'kindergartens', KindergartenViewSet)
router.register(r'social-child-projects', SocialChildProjectViewSet)
router.register(r'social-teenager-projects', SocialTeenagerProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('user/save_item/', save_item_view, name='save_item'),
    path('logout/', logout_view, name='logout'),
    path('user/update/', update_user_view, name='update_user'),
]
