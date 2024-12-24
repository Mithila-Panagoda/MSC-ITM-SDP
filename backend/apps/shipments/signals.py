from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ShipmentUpdate

@receiver(post_save, sender=ShipmentUpdate)
def update_shipment_status(sender, instance, **kwargs):
    shipment = instance.shipment
    shipment.status = instance.status
    shipment.save()
