from django.db import models
import uuid
from django.utils import timezone
from users.models import User


class Project(models.Model):
    uid = models.UUIDField(
        unique=True, default=uuid.uuid4, null=False, blank=False)
    created_by = models.ForeignKey(
        User,
        null=False,
        blank=False,
        to_field='uid',
        on_delete=models.CASCADE, related_name='projects',
    )
    status = models.CharField(
        max_length=20,
        null=False,
        blank=False,
        default='Running'
    )
    name = models.CharField(max_length=100, null=False, blank=False,)
    type = models.CharField(max_length=20, null=False, blank=False,)
    description = models.CharField(max_length=260, null=False, blank=False,)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
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
