from rest_framework import serializers
from .models import (
    Shipment,
    ShipmentUpdate,
    Reschedule,
)

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
        

        
class RescheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reschedule
        fields = "__all__"
        
class CreateRescheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reschedule
        fields = ['new_delivery_date', 'custom_instructions','new_location']