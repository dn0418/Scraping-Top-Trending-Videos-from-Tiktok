from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
import uuid

# so we need to migrate users first

# may be migrations is having problems 
# here there is the solution
# no need tmp never mind
# first users

class User(AbstractUser):
    uid = models.UUIDField(
        unique=True, default=uuid.uuid4, null=False, blank=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    fullname = models.CharField(max_length=100, null=True)

    def save(self, *args, **kwargs):
        self.set_password(self.password)
        while True:
            try:
                super().save(*args, **kwargs)
                break
            except Exception as e:
                # check if it includes duplicate key error (uid)
                if 'duplicate key value violates unique constraint' in str(e) and 'Key (uid)' in str(e) and 'already exists' in str(e):
                    self.uid = uuid.uuid4()
                else:
                    raise e


    def __str__(self) -> str:
        return str(self.uid)