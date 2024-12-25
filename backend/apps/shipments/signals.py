from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ShipmentUpdate,ShipmentStatues
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@receiver(post_save, sender=ShipmentUpdate)
def update_shipment_status(sender, instance, **kwargs):
    shipment = instance.shipment
    previous_status = shipment.status
    shipment.status = instance.status
    
    if shipment.status == ShipmentStatues.DELIVERED:
        raise ValueError('Cannot update a delivered shipment.')
    
    if previous_status == shipment.status:
        raise ValueError(f'Shipment status is already {shipment.status}.')
    
    shipment.save()
    
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'shipment_{shipment.tracking_id}',
        {
            'type': 'shipment_update',
            'status': instance.status,
            'created_at': instance.created_at.isoformat(),
            'location': instance.location,
        }
    )