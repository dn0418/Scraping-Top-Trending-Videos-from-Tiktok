from users.models import User
from users.serializers import UserSerializer
import jwt

def jwt_super_user_middleware(request):
    token = request.headers['Authorization'].split('Bearer ')[-1]
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        uid = payload['id']
        user = User.objects.filter(uid=uid).first()
        if user is None:
            return {'error': 'User not found'}
        request.user = UserSerializer(user).data
        request.user['uid'] = uid
        if not user.is_superuser:
            return {'error': 'You are not authorized to perform this action'}
        return True
    except jwt.ExpiredSignatureError:
        return {'error': 'Token expired'}
    except jwt.DecodeError:
        return {'error': 'Token invalid'}
