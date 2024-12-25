from rest_framework import serializers
from .models import Shipment,ShipmentUpdate

class ShipmentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipmentUpdate
        fields = "__all__"

class ShipmentDetailSerializer(serializers.ModelSerializer):
    updates = serializers.SerializerMethodField()
    class Meta:
        model = Shipment
        fields = "__all__"

    def get_updates(self, obj):
        updates = obj.updates.order_by('-created_at')
        return ShipmentUpdateSerializer(updates, many=True).data
    
class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = "__all__"
        

        
    