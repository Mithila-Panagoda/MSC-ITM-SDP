from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet,ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException

from .models import(
    Shipment,
    ShipmentUpdate,
    ShipmentStatues,
    Reschedule,
    Notification
)
from .serializer import(
    ShipmentSerializer,
    ShipmentUpdateSerializer,
    ShipmentDetailSerializer,
    RescheduleSerializer,
    CreateRescheduleSerializer,
    NotificationSerializer,
    UpdateNotificationSerializer,
)
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .services import(
    create_reschedule,
    update_notification_methods
)

class ShipmentViewSet(ReadOnlyModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    permission_classes = [IsAuthenticated]
    tags = ['Shipment']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ShipmentSerializer
        elif self.action == 'retrieve':
            return ShipmentDetailSerializer
        return ShipmentSerializer
    
    def get_queryset(self):
        return Shipment.objects.filter(customer=self.request.user)
    
class ShipmentUpdateViewSet(ReadOnlyModelViewSet):
    queryset = ShipmentUpdate.objects.all()
    serializer_class = ShipmentUpdateSerializer
    permission_classes = [IsAuthenticated]
    tags = ['ShipmentUpdate']
    
    def get_queryset(self):
        return ShipmentUpdate.objects.filter(shipment_id=self.kwargs.get('shipment_pk'),shipment__customer=self.request.user)
    
class RescheduleViewSet(ModelViewSet):
    queryset = Reschedule.objects.all()
    serializer_class = RescheduleSerializer
    permission_classes = [IsAuthenticated]
    tags = ['Reschedule']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateRescheduleSerializer
        return RescheduleSerializer
    
    def get_queryset(self):
        shipment = Shipment.objects.filter(id=self.kwargs.get('shipment_pk')).first()
        return Reschedule.objects.filter(shipment_id=shipment.id)
    
    def create(self, request, *args, **kwargs):

        shipment_id= kwargs.get('shipment_pk')
        shipment_instance = get_object_or_404(Shipment, id=shipment_id)
        if shipment_instance.customer != request.user:
            raise APIException("Shipment does not belong to user")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_reschedule(shipment_instance, serializer.validated_data)
        return Response(RescheduleSerializer(result).data, status=status.HTTP_201_CREATED)
    
class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    tags = ['NotificationMethod']
    
    def get_serializer_class(self):
        if self.action == 'partial_update':
            return UpdateNotificationSerializer
        return NotificationSerializer
    
    def list(self, request, *args, **kwargs):
        raise APIException("Cannot list all notifications")
    
    def create(self, request, *args, **kwargs):
        raise APIException("Cannot create notifications")
    
    def destroy(self, request, *args, **kwargs):
        raise APIException("Cannot delete notifications")
    
    def update(self, request, *args, **kwargs):
        raise APIException("Cannot update notifications")
    
    def partial_update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        notification_instance = get_object_or_404(Notification, id=kwargs.get('shipment_pk'))
        if notification_instance.shipment.customer != request.user:
            raise APIException("You are not authorized to update this notification method")
        result = update_notification_methods(notification_instance, serializer.validated_data)
        return Response(NotificationSerializer(result).data,status=status.HTTP_200_OK)