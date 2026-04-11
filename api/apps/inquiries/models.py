from django.conf import settings
from django.db import models


class Inquiry(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inquiries',
        null=True,
        blank=True,
    )

    name = models.CharField(max_length=200)
    email = models.EmailField()
    event_type = models.CharField(max_length=200)
    event_date = models.DateField()
    event_time = models.TimeField(default='00:00:00')
    location = models.CharField(max_length=200)
    guests = models.IntegerField(default=0)
    comments = models.TextField(blank=True)
    status = models.CharField(max_length=50, default='Pending') 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.event_date}"