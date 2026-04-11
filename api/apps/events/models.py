from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    event_date = models.DateField()
    location = models.CharField(max_length=200)
    description = models.TextField()
    cover_image = models.ImageField(upload_to="events/covers/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title





class EventImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="events/gallery/")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.event.title} - Image"
    


