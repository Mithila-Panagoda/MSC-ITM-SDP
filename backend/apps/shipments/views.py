from rest_framework.viewsets import ReadOnlyModelViewSet,ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from django.http import StreamingHttpResponse
from .models import(
    Shipment,
    ShipmentUpdate,
    ShipmentStatues,
    Reschedule
)
from .serializer import(
    ShipmentSerializer,
    ShipmentUpdateSerializer,
    ShipmentDetailSerializer,
    RescheduleSerializer,
    CreateRescheduleSerializer
)
from django.shortcuts import get_object_or_404

from .services import(
    create_reschedule
)

class ShipmentViewSet(ReadOnlyModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    tags = ['Shipment']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ShipmentSerializer
        elif self.action == 'retrieve':
            return ShipmentDetailSerializer
        return ShipmentSerializer
class ShipmentUpdateViewSet(ReadOnlyModelViewSet):
    queryset = ShipmentUpdate.objects.all()
    serializer_class = ShipmentUpdateSerializer
    tags = ['ShipmentUpdate']
    
    
class RescheduleViewSet(ModelViewSet):
    queryset = Reschedule.objects.all()
    serializer_class = RescheduleSerializer
    tags = ['Reschedule']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateRescheduleSerializer
        return RescheduleSerializer
    
    def get_queryset(self):
        shipment = get_object_or_404(Shipment, id=self.kwargs.get('shipment_pk'))
        return Reschedule.objects.filter(shipment_id=shipment.id)
    
    def create(self, request, *args, **kwargs):

        shipment_id= kwargs.get('shipment_pk')
        shipment_instance = get_object_or_404(Shipment, id=shipment_id)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_reschedule(shipment_instance, serializer.validated_data)
        return Response(RescheduleSerializer(result).data, status=status.HTTP_201_CREATED)