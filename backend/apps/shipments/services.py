from .models import(
    Shipment,
    ShipmentUpdate,
    ShipmentStatues,
    Reschedule,
    RescheduleStatues
)

from rest_framework.exceptions import APIException

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
            'status': RescheduleStatues.PENDING
        }
    )
    return reschedule