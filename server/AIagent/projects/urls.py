from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('', views.Projects.as_view(), name='projects'),
    path('user', views.UserProjects.as_view(), name="user_projects"),
    path('/<str:project_id>', views.ProjectId.as_view(), name="project_id")
]
