from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.users.models import User
from .models import Shipment, ShipmentUpdate, Reschedule, Notification
import uuid

class ShipmentViewSetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com',username="test@example.com", password='password')
        self.client.force_authenticate(user=self.user)
        self.shipment = Shipment.objects.create(
            customer=self.user,
            origin_location='Origin',
            destination_location='Destination',
            estimated_delivery_date='2023-12-31'
        )
    
    def test_list_shipments(self):
        url = reverse('shipments-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_retrieve_shipment(self):
        url = reverse('shipments-detail', args=[self.shipment.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_shipment_by_tracking_id(self):
        url = reverse('shipments-get-shipment-by-tracking-id', args=[self.shipment.tracking_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# class ShipmentUpdateViewSetTest(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(email='test@example.com', password='password')
#         self.client.force_authenticate(user=self.user)
#         self.shipment = Shipment.objects.create(
#             customer=self.user,
#             origin_location='Origin',
#             destination_location='Destination',
#             estimated_delivery_date='2023-12-31'
#         )
#         self.shipment_update = ShipmentUpdate.objects.create(
#             shipment=self.shipment,
#             from_location='Location A',
#             to_location='Location B',
#             status='IN_TRANSIT',
#             location='Location B'
#         )
    
#     def test_list_shipment_updates(self):
#         url = reverse('shipmentupdate-list', args=[self.shipment.id])
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

# class RescheduleViewSetTest(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(email='test@example.com', password='password')
#         self.client.force_authenticate(user=self.user)
#         self.shipment = Shipment.objects.create(
#             customer=self.user,
#             origin_location='Origin',
#             destination_location='Destination',
#             estimated_delivery_date='2023-12-31'
#         )
    
#     def test_create_reschedule(self):
#         url = reverse('reschedule-list', args=[self.shipment.id])
#         data = {
#             'new_delivery_date': '2023-12-25',
#             'custom_instructions': 'Leave at the front door',
#             'new_location': 'New Location'
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class NotificationViewSetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='password')
        self.client.force_authenticate(user=self.user)
        self.shipment = Shipment.objects.create(
            customer=self.user,
            origin_location='Origin',
            destination_location='Destination',
            estimated_delivery_date='2023-12-31'
        )
        self.notification = Notification.objects.create(
            shipment=self.shipment,
            send_email=True,
            send_sms=False,
            send_push_notification=False
        )
    
    def test_partial_update_notification(self):
        url = reverse('notification-partial-update', args=[self.shipment.id, self.notification.id])
        data = {'send_sms': True}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
