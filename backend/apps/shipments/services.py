from .models import(
    Shipment,
    ShipmentUpdate,
    ShipmentStatues,
    Reschedule,
    RescheduleStatues,
    Notification,
    NotificationMessage
)
from django.core.mail import EmailMessage
from typing import List
from django.conf import settings
from rest_framework.exceptions import APIException
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def create_reschedule(shipment: Shipment, reschedule_data: dict) -> Reschedule:
    if shipment.status != ShipmentStatues.DELIVERY_MISSED:
        raise APIException("Can only reschedule missed deliveries.")

    shipment_update = shipment.updates.order_by('-created_at').first()
    reschedule, created = Reschedule.objects.update_or_create(
        shipment=shipment,
        defaults={
            'new_delivery_date': reschedule_data['new_delivery_date'],
            'custom_instructions': reschedule_data.get('custom_instructions'),
            'new_location': reschedule_data.get('new_location',shipment_update.location),
            'admin_response':"",
            'status': RescheduleStatues.PENDING
        }
    )
    return reschedule

def update_notification_methods(notification: Notification, data: dict) -> Notification:
    for key, value in data.items():
        setattr(notification, key, value)
    notification.save()
    return notification


def prep_email_for_shipment_status_update(shipment: Shipment, shipment_update: ShipmentUpdate) -> tuple:
    context = {
        'customer_name': f'{shipment.customer.first_name} {shipment.customer.last_name}',
        'shipment_status': shipment_update.status,
        'tracking_id': shipment.tracking_id,
        'tracking_url': f'{settings.WEBAPP_URL}/shipment/{shipment.id}',
        'privacy_policy_url': 'https://example.com/privacy-policy',
        'contact_url': 'https://example.com/contact',
    }
    if shipment_update.status == ShipmentStatues.DELIVERY_MISSED:
        template = 'shipmentUpdateDeliveryFail.html'
    else:
        template = 'shipmentUpdates.html'
    
    html_message = render_to_string(template, context)
    plain_message = strip_tags(html_message)
    
    return html_message, plain_message
    
def prep_email_for_reschedule(reschedule: Reschedule) -> tuple:
    shipment = reschedule.shipment
    context = {
        'customer_name': f'{shipment.customer.first_name} {shipment.customer.last_name}',
        'tracking_id': shipment.tracking_id,
        'new_delivery_date': reschedule.new_delivery_date,
        'new_location': reschedule.new_location,
        'privacy_policy_url': 'https://example.com/privacy-policy',
        'contact_url': 'https://example.com/contact',
    }
    if reschedule.status == RescheduleStatues.ACCEPTED:
        template = 'rescheduleAccepted.html'
    else:
        template = 'rescheduleRejected.html'
        
    html_message = render_to_string(template, context)
    plain_message = strip_tags(html_message)
    
    return html_message, plain_message

def send_email(
    subject: str,
    html_message,
    recipient_list: List[str],
    fail_silently: bool = False,
) -> None:
    email = EmailMessage(
        subject=subject,
        body=html_message,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list
    )
    if html_message:
        email.content_subtype = 'html'
    email.send(fail_silently=fail_silently)
