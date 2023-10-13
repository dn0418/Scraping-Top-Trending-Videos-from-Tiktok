from django.shortcuts import get_object_or_404
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from AIagent.middleware.jwt_middleware import validate_jwt_token
from AIagent.middleware.super_user_middleware import jwt_super_user_middleware


class Projects(APIView):
    def post(self, request):
        try:
            valid = validate_jwt_token(request)
            if type(valid) is not bool:
                return Response(valid, status=status.HTTP_401_UNAUTHORIZED)
            serializer = ProjectSerializer(data={
                **request.data,
                'created_by': request.user['uid']
            })
            is_valid = serializer.is_valid()
            if not is_valid:
                return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({
                'project': serializer.data,
                'message': 'project created successfully.',
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            valid = validate_jwt_token(request)
            # check if valid is bool before proceeding
            if type(valid) is not bool:
                return Response(valid, status=status.HTTP_401_UNAUTHORIZED)
            limit = request.GET.get('limit', None)
            page = request.GET.get('page', None)
            if limit is None or limit == '':
                return Response({'error': 'limit is required'}, status=status.HTTP_400_BAD_REQUEST)
            if page is None or page == '':
                return Response({'error': 'patge is required'})
            try:
                page = int(page)
                limit = int(limit)
            except ValueError:
                return Response({'error': "page or limit are no numbers"}, status=status.HTTP_400_BAD_REQUEST)

            offset = (page - 1) * limit

            current_user_uid = request.user['uid']

            user_projects = Project.objects.filter(created_by=current_user_uid)

            total = user_projects.count()

            projects = user_projects[offset:offset+limit]

            return Response({
                'projects': [ProjectSerializer(project).data for project in projects],
                'limit': limit,
                'page': page,
                'total': total,
                'message': 'Your projects were retrived successfully.'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProjectId(APIView):
    def get(self, request, project_id):
        try:
            valid = validate_jwt_token(request)
            if type(valid) is not bool:
                return Response(valid, status=status.HTTP_401_UNAUTHORIZED)
            project = get_object_or_404(Project, uid=project_id)
            return Response({
                'project': ProjectSerializer(project).data,
                'message': 'Project retrieved successfully',
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProjects(APIView):
    def get(self, request):
        try:
            valid = jwt_super_user_middleware(request)
            if type(valid) is not bool:
                return Response(valid, status=status.HTTP_401_UNAUTHORIZED)
            projects = Project.objects
            return Response({
                'projects': [ProjectSerializer(project) for project in projects],
                'message': 'User projects retrieved succesfully',
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
