from rest_framework.viewsets import ReadOnlyModelViewSet
import time
from django.http import StreamingHttpResponse
from .models import(
    Shipment,
    ShipmentUpdate,
    ShipmentStatues
)
from .serializer import(
    ShipmentSerializer,
    ShipmentUpdateSerializer,
    ShipmentDetailSerializer
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
    
    
    
