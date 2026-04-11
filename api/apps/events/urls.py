from django.urls import path

from .views import EventsView, EventS3ImagesView

urlpatterns = [
    path("events/", EventsView.as_view()),
    path("events/s3-images/", EventS3ImagesView.as_view()),
    path("events/<slug:slug>/", EventsView.as_view()),
]
