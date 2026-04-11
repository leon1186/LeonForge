import uuid
from django.db import models
from apps.inquiries.models import Inquiry


class Quote(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("deposit_paid", "Deposit Paid"),
        ("completed", "Completed"),
    ]

    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE, related_name="quotes")
    total_amount = models.PositiveIntegerField()
    deposit_amount = models.PositiveIntegerField()
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quote for {self.inquiry.name}"


class Payment(models.Model):
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE, related_name="payments")
    stripe_session_id = models.CharField(max_length=255)
    amount = models.PositiveIntegerField()
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.stripe_session_id}"