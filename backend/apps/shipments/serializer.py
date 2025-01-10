from rest_framework import serializers
from .models import (
    Shipment,
    ShipmentUpdate,
    Reschedule,
    Notification,
    NotificationMessage
)

class ShipmentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipmentUpdate
        fields = "__all__"

    
class SimpleNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
        
class RescheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reschedule
        fields = "__all__"

class ShipmentDetailSerializer(serializers.ModelSerializer):
    notifications = SimpleNotificationSerializer()
    updates = serializers.SerializerMethodField()
    reschedules = RescheduleSerializer()
    class Meta:
        model = Shipment
        fields = "__all__"

    def get_updates(self, obj):
        updates = obj.updates.order_by('-created_at')
        return ShipmentUpdateSerializer(updates, many=True).data
class ShipmentSerializer(serializers.ModelSerializer):
    notifications = SimpleNotificationSerializer()
    
    class Meta:
        model = Shipment
        fields = "__all__"
        
class CreateRescheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reschedule
        fields = ['new_delivery_date', 'custom_instructions','new_location']
        
class NotificationMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationMessage
        fields = "__all__"
class NotificationSerializer(serializers.ModelSerializer):
    messages = NotificationMessageSerializer(many=True)
    class Meta:
        model = Notification
        fields = "__all__"
        
class UpdateNotificationSerializer(serializers.ModelSerializer):
    send_email = serializers.BooleanField(required=False)
    send_sms = serializers.BooleanField(required=False)
    send_push_notification = serializers.BooleanField(required=False)
    class Meta:
        model = Notification
        fields = ['send_email','send_sms','send_push_notification']