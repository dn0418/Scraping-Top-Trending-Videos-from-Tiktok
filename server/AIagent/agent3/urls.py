from django.urls import path
from . import views

app_name = 'agent3'

urlpatterns = [
    path('', views.SocialMediaPost.as_view(), name='upload')
]