import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ShipmentUpdateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.tracking_id = self.scope['url_route']['kwargs']['tracking_id']
        self.group_name = f'shipment_{self.tracking_id}'

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        pass

    async def shipment_update(self, event):
        await self.send(text_data=json.dumps({
            'status': event['status'],
            'created_at': event['created_at'],
            'location': event.get('location', ''),
            'from_location': event.get('from_location', ''),
            'to_location': event.get('to_location', ''),
        }))