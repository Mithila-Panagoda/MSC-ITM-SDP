from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import(
    Shipment
)
from .serializer import(
    ShipmentSerializer
)

class ShipmentViewSet(ReadOnlyModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    
