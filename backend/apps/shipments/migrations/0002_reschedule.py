# Generated by Django 4.2 on 2024-12-30 06:25

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('shipments', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reschedule',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('new_delivery_date', models.DateField()),
                ('custom_instructions', models.TextField(blank=True, null=True)),
                ('admin_response', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('CONFIRMED', 'Confirmed'), ('SHIPPED', 'Shipped'), ('IN_TRANSIT', 'In Transit'), ('DELIVERED', 'Delivered'), ('DELIVERY_MISSED', 'Delivery Missed')], default='PENDING', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('shipment', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='reschedules', to='shipments.shipment')),
            ],
        ),
    ]
