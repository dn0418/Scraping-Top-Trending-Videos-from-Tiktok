from projects.models import Project
from projects.serializers import ProjectSerializer
from django.shortcuts import get_object_or_404

def validate_project(request):
    try:
        projectId = request.GET.get('project', None)
        if projectId is None:
            return {'error': 'Provide project id'}
        project = get_object_or_404(Project, uid=projectId)
        request.project = ProjectSerializer(project).data
        return True
    except Exception as e:
        return {'error': str(e)}