from django.db import models
from apps.users.models import User
import uuid
import string
import random

class ShipmentStatues(models.TextChoices):
    PENDING = 'PENDING', 'Pending'
    CONFIRMED = 'CONFIRMED', 'Confirmed'
    SHIPPED = 'SHIPPED', 'Shipped'
    IN_TRANSIT = 'IN_TRANSIT', 'In Transit'
    DELIVERED = 'DELIVERED', 'Delivered'
    DELIVERY_MISSED = 'DELIVERY_MISSED', 'Delivery Missed'

class Shipment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tracking_id = models.CharField(max_length=8, unique=True, editable=False)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shipments')
    status = models.CharField(max_length=20, choices=ShipmentStatues.choices, default=ShipmentStatues.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.id} - {self.customer.email}'

    def save(self, *args, **kwargs):
        if not self.tracking_id:
            self.tracking_id = self.generate_tracking_id()
        super().save(*args, **kwargs)
    
    def generate_tracking_id(self, length=8, max_attempts=10):
        if length < 8:
            raise ValueError("Length must be at least 8 characters")
        for _ in range(max_attempts):
            letters = ''.join(random.choices(string.ascii_uppercase, k=4))
            numbers = ''.join(random.choices(string.digits, k=4))
            code = letters + numbers
            if not Shipment.objects.filter(tracking_id=code).exists():
                return code
        raise ValueError("Unable to generate a unique tracking ID after multiple attempts")
    
class ShipmentUpdate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE, related_name='updates')
    status = models.CharField(max_length=20, choices=ShipmentStatues.choices)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.id)