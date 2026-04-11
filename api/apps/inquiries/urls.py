from django.urls import path
from .views import InquiriesView

urlpatterns = [
    path('inquiries/', InquiriesView.as_view()),
    path('inquiries/<int:pk>', InquiriesView.as_view()),
]