from rest_framework import serializers

from .models import Event, EventImage


class EventImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image_key = serializers.CharField(source="image.name", read_only=True)

    class Meta:
        model = EventImage
        fields = ["id", "order", "image_url", "image_key"]

    def get_image_url(self, obj):
        return obj.image.url if obj.image else None


class EventSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    cover_image_key = serializers.CharField(source="cover_image.name", read_only=True)
    images = EventImageSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "slug",
            "event_date",
            "location",
            "description",
            "cover_image_url",
            "cover_image_key",
            "images",
            "created_at",
        ]

    def get_cover_image_url(self, obj):
        return obj.cover_image.url if obj.cover_image else None
