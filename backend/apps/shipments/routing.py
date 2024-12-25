from django.urls import re_path
from .consumer import ShipmentUpdateConsumer

websocket_urlpatterns = [
    re_path(r'ws/shipment-updates/(?P<tracking_id>[^/]+)/$', ShipmentUpdateConsumer.as_asgi()),
]