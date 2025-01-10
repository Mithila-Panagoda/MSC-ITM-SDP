const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SHIPMENTS_URL = `${BASE_URL}/api/shipments/`;
const ACCESS_TOKEN_KEY = 'accessToken';
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_BASE_URL;

export const getShipments = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(SHIPMENTS_URL, {
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
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(`${SHIPMENTS_URL}${id}`, {
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
    const ws = new WebSocket(`${WEBSOCKET_URL}/ws/shipment-updates/${trackingId}/`);
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
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(`${SHIPMENTS_URL}track/${trackingId}`, {
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
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(`${SHIPMENTS_URL}${shipmentId}/notifications/${notificationId}/`, {
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

export const rescheduleShipment = async (id: string, rescheduleDetails: { new_delivery_date: string; new_location: string; custom_instructions: string }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await fetch(`${SHIPMENTS_URL}${id}/reschedules/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rescheduleDetails)
    });

    if (!response.ok) {
        throw new Error('Failed to reschedule shipment');
    }
}
