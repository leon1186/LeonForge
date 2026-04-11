import os

import boto3
from botocore.exceptions import BotoCoreError, ClientError
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Event
from .serializers import EventSerializer


class EventsView(APIView):
	permission_classes = [AllowAny]
	authentication_classes = []

	def get(self, request, slug=None):
		if slug:
			event = get_object_or_404(Event.objects.prefetch_related("images"), slug=slug)
			serializer = EventSerializer(event)
		else:
			events = Event.objects.prefetch_related("images").all().order_by("event_date")
			serializer = EventSerializer(events, many=True)

		return Response({"result": serializer.data})


class EventS3ImagesView(APIView):
	permission_classes = [AllowAny]
	authentication_classes = []
	URL_EXPIRES_IN_SECONDS = 3600

	def _build_presigned_url(self, client, bucket_name, key):
		try:
			return client.generate_presigned_url(
				"get_object",
				Params={"Bucket": bucket_name, "Key": key},
				ExpiresIn=self.URL_EXPIRES_IN_SECONDS,
			)
		except (BotoCoreError, ClientError):
			return None

	def get(self, request):
		bucket_name = settings.AWS_STORAGE_BUCKET_NAME
		if not bucket_name:
			return Response({"result": [], "meta": {"reason": "missing_bucket"}})

		region_name = getattr(settings, "AWS_S3_REGION_NAME", os.getenv("AWS_S3_REGION_NAME", "sa-east-1"))
		client = boto3.client(
			"s3",
			aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
			aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
			region_name=region_name,
		)

		try:
			response = client.list_objects_v2(Bucket=bucket_name, Prefix="events/", MaxKeys=200)
		except (BotoCoreError, ClientError):
			return Response({"result": [], "meta": {"reason": "s3_list_failed"}})

		contents = sorted(
			response.get("Contents", []),
			key=lambda item: item.get("LastModified"),
			reverse=True,
		)

		images = []
		for item in contents:
			key = item.get("Key", "")
			if key.endswith("/"):
				continue
			if not key.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
				continue

			filename = key.split("/")[-1]
			title = filename.rsplit(".", 1)[0].replace("-", " ").replace("_", " ").title()
			image_url = self._build_presigned_url(client, bucket_name, key)
			if not image_url:
				continue
			images.append({"title": title or "Event", "image": image_url, "key": key})

		if not images:
			try:
				root_response = client.list_objects_v2(Bucket=bucket_name, MaxKeys=200)
			except (BotoCoreError, ClientError):
				return Response({"result": [], "meta": {"reason": "s3_root_list_failed"}})

			root_contents = sorted(
				root_response.get("Contents", []),
				key=lambda item: item.get("LastModified"),
				reverse=True,
			)

			for item in root_contents:
				key = item.get("Key", "")
				if key.endswith("/"):
					continue
				if not key.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
					continue

				filename = key.split("/")[-1]
				title = filename.rsplit(".", 1)[0].replace("-", " ").replace("_", " ").title()
				image_url = self._build_presigned_url(client, bucket_name, key)
				if not image_url:
					continue
				images.append({"title": title or "Event", "image": image_url, "key": key})

		images = images[:3]
		return Response({"result": images, "meta": {"count": len(images)}})
