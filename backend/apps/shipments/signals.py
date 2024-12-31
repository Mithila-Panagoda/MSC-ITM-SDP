from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Shipment,ShipmentUpdate,ShipmentStatues,Reschedule,RescheduleStatues,Notification,NotificationMessage
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@receiver(post_save, sender=Shipment)
def create_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(shipment=instance)

@receiver(post_save, sender=ShipmentUpdate)
def update_shipment_status(sender, instance, **kwargs):
    shipment = instance.shipment
    previous_status = shipment.status
    shipment.status = instance.status
    
    if previous_status == ShipmentStatues.DELIVERED:
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
    
    notification_for_shipment = Notification.objects.filter(shipment=shipment).first()
    notification_message = NotificationMessage(
        notification=notification_for_shipment,
        message=f'Your shipment status has been updated to {instance.status}'
    )
    notification_message.save()
    
@receiver(post_save, sender=Reschedule)
def accept_or_reject_reschedule(sender, instance, **kwargs):
    shipment = instance.shipment
    if instance.status == RescheduleStatues.ACCEPTED:
        ShipmentUpdate.objects.create(
            shipment=shipment,
            status=ShipmentStatues.PENDING,
            location=instance.new_location
        )
        
    #TODO: Send notification to customer and handle rejects
    
    
@receiver(post_save, sender=NotificationMessage)
def send_notification(sender, instance, created, **kwargs):
    if created:
        notification = instance.notification
        if notification.send_email:
            print(f'Sending email to {notification.shipment.customer.email} \n Message: {instance.message}')
            pass #TODO: connect to email service
        if notification.send_sms:
            pass
        if notification.send_push_notification:
            pass