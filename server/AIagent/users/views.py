from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User
import re
import jwt
import datetime


class Register(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            is_valid = serializer.is_valid()
            if not is_valid:
                return Response({'error':  serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            token = create_auth_token(serializer.instance)
            
            return Response({
                'token': token,
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Login(APIView):
    def post(self, request):
        try:
            email = request.data['email'] if 'email' in request.data else None
            password = request.data['password'] if 'password' in request.data else None
            if email is None or password is None or email == '' or password == '':
                return Response({'error': 'Email or Password is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.filter(email=email).first()

            if user is None:
                return Response({'error': 'Email or Password is invalid'}, status=status.HTTP_400_BAD_REQUEST)

            if not user.check_password(password):
                return Response({'error': 'Email or Password is invalid'}, status=status.HTTP_400_BAD_REQUEST)
            token = create_auth_token(user.uid)
            return Response({
                'token': token,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RefreshToken(APIView):
    def post(self, request):
        try:
            token = request.headers['Authorization']
            token = token.split('Bearer ')[1]
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            payload = {}
            payload['exp'] = datetime.datetime.utcnow() + \
                datetime.timedelta(days=7)
            payload['iat'] = datetime.datetime.utcnow()
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            return Response({
                'token': token,
            }, status=status.HTTP_200_OK)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Me(APIView):
    def get(self, request):
        try:
            token = request.headers['Authorization']
            token = token.split('Bearer ')[1]
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.filter(uid=payload['id']).first()
            if user is None:
                return Response({'error': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def split_fullname(fullname):
    fullname = fullname.split(' ')
    if len(fullname) == 1:
        return fullname[0], ''
    else:
        return fullname[0], ' '.join(fullname[1:])


def create_auth_token(uid):

    payload = {
        'id': str(uid),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow(),
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    return token

# def is_email(email):
#     if re.match(r'^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', email):
#         return True
#     else:
#         return False
