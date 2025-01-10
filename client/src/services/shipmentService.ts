export const getShipments = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch('http://localhost:8000/api/shipments/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch shipments');
    }

    const data = await response.json();
    return data;
};

export const getShipment = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(`http://localhost:8000/api/shipments/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch shipment');
    }

    const data = await response.json();
    return data;
}

export const connectShipmentWebSocket = (trackingId: string, onMessage: (update: any) => void) => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/shipment-updates/${trackingId}/`);
    ws.onmessage = (event) => {
        const update = JSON.parse(event.data);
        onMessage(update);
    };
    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
    ws.onclose = () => {
        console.log("WebSocket connection closed");
    };
    return ws;
};

export const getShipmentByTrackingId = async (trackingId: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(`http://localhost:8000/api/shipments/track/${trackingId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch shipment');
    }

    const data = await response.json();
    return data;
}

export const updateNotificationSettings = async (shipmentId: string, notificationId: string, settings: any) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(`http://localhost:8000/api/shipments/${shipmentId}/notifications/${notificationId}/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    });

    if (!response.ok) {
        throw new Error('Failed to update notification settings');
    }
}