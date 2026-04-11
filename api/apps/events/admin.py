from django.contrib import admin
from .models import Event, EventImage


class EventImageInline(admin.TabularInline):
	model = EventImage
	extra = 1


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
	list_display = ("title", "event_date", "location", "slug")
	search_fields = ("title", "location", "slug")
	prepopulated_fields = {"slug": ("title",)}
	inlines = [EventImageInline]


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
	list_display = ("event", "order")
	list_filter = ("event",)
