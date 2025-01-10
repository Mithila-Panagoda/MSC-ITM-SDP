from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Shipment,ShipmentUpdate,ShipmentStatues,Reschedule,RescheduleStatues,Notification,NotificationMessage,NotificationStatus
from asgiref.sync import async_to_sync
from django.utils import timezone
from channels.layers import get_channel_layer
from .services import prep_email_for_shipment_status_update,send_email,prep_email_for_reschedule

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
            'from_location': instance.from_location if instance.from_location else '',
            'to_location': instance.to_location if instance.to_location else '',
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
        
    if instance.status != RescheduleStatues.PENDING:
        html_message, _ = prep_email_for_reschedule(instance)
        try:
            send_email(
                subject='Reschedule Status',
                recipient_list=[shipment.customer.email],
                html_message=html_message,
            )
        except Exception as e:
            pass
    
    
@receiver(post_save, sender=NotificationMessage)
def send_notification(sender, instance, created, **kwargs):
    if created:
        notification = instance.notification
        
        if notification.shipment.status == ShipmentStatues.PENDING and notification.shipment.reschedules.status==RescheduleStatues.ACCEPTED:
            return  # Do not send email if shipment is pending and there is an accepted reschedule request
        
        if notification.send_email:
            html_message, _ = prep_email_for_shipment_status_update(notification.shipment, notification.shipment.updates.order_by('-created_at').first())
            try:
                send_email(
                    subject='Shipment Status Update',
                    recipient_list=[notification.shipment.customer.email],
                    html_message=html_message,  
                )
                instance.email_status = NotificationStatus.SENT
            except Exception as e:
                instance.email_status = NotificationStatus.FAILED
            instance.save()
        if notification.send_sms:
            pass
        if notification.send_push_notification:
            pass