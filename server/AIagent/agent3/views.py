from ayrshare import SocialPost
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import time
import math
from typing import Any
from .utils.upload_file import upload
from .utils.save_file_locally import save_uploaded_file_locally

social = SocialPost('M2KRRSS-PEEMJDV-NY3MF2A-KQVZ1BQ')


class SocialMediaPost(APIView):
    def post(self, request):
        try:
            platforms = request.data['platforms']
            file = request.data['file']
            description = request.data['description'] if 'description' in request.data else 'Best Image'
            title = request.data['title'] if 'title' in request.data else 'Best Image'
            file_format = request.data['file_format'] if 'file_format' in request.data else 'mp4'
            name = f'{title}{math.floor(time.time())}.{file_format}'
            save_uploaded_file_locally(file, name)
            uploadResponse: Any = upload(name, file_format)
            if uploadResponse is None:
                return Response({'error': 'Error uploading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            postResponse: Any = social.post({
                'post': title,
                'platforms': platforms,
                'mediaUrls': [uploadResponse['accessUrl']],
            })
            print(postResponse)
            if postResponse['status'] == 'error':
                if 'errors' in postResponse:
                    return Response({'error': postResponse['errors']}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'error': [postResponse]}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'response': uploadResponse, 'postResponse': postResponse})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
