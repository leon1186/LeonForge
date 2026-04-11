from datetime import date, time

from django.contrib.auth import get_user_model

from apps.inquiries.models import Inquiry


User = get_user_model()

user, created = User.objects.get_or_create(
    username="leonforge",
    defaults={"email": "correo@ejemplo.com"},
)

if created:
    user.set_password("admin")
    user.save()

inquiries_data = [
    {
        "name": "John Doe",
        "email": "john@example.com",
        "event_type": "Wedding",
        "event_date": date(2026, 5, 20),
        "event_time": time(18, 30),
        "location": "Medellin",
        "guests": 120,
    },
    {
        "name": "Maria Lopez",
        "email": "maria@example.com",
        "event_type": "Birthday",
        "event_date": date(2026, 6, 15),
        "event_time": time(20, 0),
        "location": "Bogota",
        "guests": 60,
    },
    {
        "name": "Carlos Ramirez",
        "email": "carlos@example.com",
        "event_type": "Corporate Event",
        "event_date": date(2026, 7, 10),
        "event_time": time(17, 0),
        "location": "Cali",
        "guests": 200,
    },
]

for inquiry_data in inquiries_data:
    Inquiry.objects.update_or_create(
        name=inquiry_data["name"],
        email=inquiry_data["email"],
        event_date=inquiry_data["event_date"],
        defaults={
            "user": user,
            "event_type": inquiry_data["event_type"],
            "event_time": inquiry_data["event_time"],
            "location": inquiry_data["location"],
            "guests": inquiry_data["guests"],
        },
    )