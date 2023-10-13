import jwt
from django.conf import settings
from users.models import User
from users.serializers import UserSerializer


def validate_jwt_token(request):
    try:
        # Verify and decode the token
        token = request.headers['Authorization'].split('Bearer ')[-1]
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        uid = payload['id']
        user = User.objects.filter(uid=uid).first()
        if user is None:
            return {'error': 'User not found'}
        request.user = UserSerializer(user).data
        request.user['uid'] = uid
        return True
    except jwt.ExpiredSignatureError:
        return {'error': 'Token expired'}
    except jwt.DecodeError:
        return {'error': 'Invalid Token'}
