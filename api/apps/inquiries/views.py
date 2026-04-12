from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from .models import Inquiry
from .serializers import InquirySerializer


class InquiriesView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        user_inquiries = Inquiry.objects.filter(user=request.user)

        if pk:
            inquiry = get_object_or_404(user_inquiries, pk=pk)
            serializer = InquirySerializer(inquiry)
        else:
            inquiries = user_inquiries.order_by('-created_at')
            serializer = InquirySerializer(inquiries, many=True)

        return Response({"result": serializer.data})

    def post(self, request):
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry_saved = serializer.save(user=request.user)

        return Response({
            "result": f"Inquiry from {inquiry_saved.name} saved"
        }, status=201)

    def delete(self, request, pk):
        inquiry = get_object_or_404(Inquiry.objects.filter(user=request.user), pk=pk)
        inquiry.delete()

        return Response({
            "result": f"Inquiry id {pk} deleted"
        }, status=204)

    def put(self, request, pk):
        inquiry = get_object_or_404(Inquiry.objects.filter(user=request.user), pk=pk)
        serializer = InquirySerializer(inquiry, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        inquiry_saved = serializer.save()
        updated_serializer = InquirySerializer(inquiry_saved)

        return Response({
            "result": updated_serializer.data
        }, status=200)