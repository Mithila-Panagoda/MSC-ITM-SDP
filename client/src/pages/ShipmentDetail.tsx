import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getShipment, connectShipmentWebSocket } from "@/services/shipmentService"; // Import the getShipment and connectShipmentWebSocket functions

const ShipmentDetail = () => {
  const { id } = useParams();
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [notifications, setNotifications] = useState({
    send_email: false,
    send_sms: false,
    send_push_notification: false,
  });
  const [isWebSocketActive, setIsWebSocketActive] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const data = await getShipment(id);
        setShipmentDetails(data);
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Failed to fetch shipment details:", error);
      }
    };

    fetchShipmentDetails();
  }, [id]);

  useEffect(() => {
    if (isWebSocketActive && shipmentDetails) {
      ws.current = connectShipmentWebSocket(shipmentDetails.tracking_id, (update) => {
        setShipmentDetails((prevDetails) => ({
          ...prevDetails,
          updates: [update, ...prevDetails.updates], // Prepend new updates
        }));
      });
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [isWebSocketActive, shipmentDetails]);

  const handleNotificationChange = (type: "send_email" | "send_sms" | "send_push_notification", checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: checked }));
    toast({
      title: "Notification preferences updated",
      description: `${type.replace('_', ' ')} notifications have been ${checked ? 'enabled' : 'disabled'}`,
    });
  };

  if (!shipmentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Shipment Details</h1>
          {/* <Badge variant="secondary" className="capitalize">
            {shipmentDetails.status.toLowerCase().replace('_', ' ')}
          </Badge> */}
          <button
            onClick={() => setIsWebSocketActive((prev) => !prev)}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isWebSocketActive ? "Disable" : "Enable"} Real-Time Updates
          </button>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Tracking Information</h2>
              <p className="text-gray-600">Tracking ID: {shipmentDetails.tracking_id}</p>
              <p className="text-gray-600">
                From: {shipmentDetails.origin_location} → To: {shipmentDetails.destination_location}
              </p>
              <p className="text-gray-600">
                Estimated Delivery: {shipmentDetails.estimated_delivery_date}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-notifications"
                    checked={notifications.send_email}
                    onCheckedChange={(checked) => handleNotificationChange("send_email", checked as boolean)}
                  />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms-notifications"
                    checked={notifications.send_sms}
                    onCheckedChange={(checked) => handleNotificationChange("send_sms", checked as boolean)}
                  />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="push-notifications"
                    checked={notifications.send_push_notification}
                    onCheckedChange={(checked) => handleNotificationChange("send_push_notification", checked as boolean)}
                  />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Shipment Updates</h2>
              <div className="space-y-4">
                {shipmentDetails.updates.map((update) => (
                  <div key={update.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{update.status.toLowerCase().replace('_', ' ')}</p>
                        <p className="text-sm text-gray-600">
                          From: {update.from_location} → To: {update.to_location}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(update.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShipmentDetail;