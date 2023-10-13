from django.urls import path
from . import views

urlpatterns = [
    path('/trending', views.get_trending_videos, name='get_trending_videos')
]
