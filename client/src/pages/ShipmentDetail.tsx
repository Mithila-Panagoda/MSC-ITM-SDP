import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getShipment, connectShipmentWebSocket, updateNotificationSettings, rescheduleShipment } from "@/services/shipmentService"; // Import the getShipment and connectShipmentWebSocket functions
import Modal from "@/components/ui/Modal"; // Import Modal, Button, and Input components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isAuthenticated, logout } from "@/services/userService"; // Import isAuthenticated and logout functions

const ShipmentDetail = () => {
  const { id } = useParams();
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [notifications, setNotifications] = useState({
    send_email: false,
    send_sms: false,
    send_push_notification: false,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isWebSocketActive, setIsWebSocketActive] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rescheduleDetails, setRescheduleDetails] = useState({
    new_delivery_date: "",
    new_location: "",
    custom_instructions: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const handleLogout = () => {
    logout();
  };

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
    if (isWebSocketActive) {
      if (import.meta.env.VITE_WEBSOCKET_ENABLED === 'false') {
        alert("Real-time updates are not available at the moment.");
        setIsWebSocketActive(false);
        return;
      }
    }

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
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    try {
      await updateNotificationSettings(id, shipmentDetails.notifications.id, notifications); // Assuming notificationId is available
      setHasChanges(false);
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      console.error("Failed to update notification settings:", error);
      toast({
        title: "Error",
        description: "Failed to update notification settings.",
      });
    }
  };

  const handleRescheduleChange = (e) => {
    const { name, value } = e.target;
    setRescheduleDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleRescheduleSubmit = async () => {
    try {
      await rescheduleShipment(id, rescheduleDetails);
      setIsModalOpen(false);
      toast({
        title: "Shipment rescheduled",
        description: "Your shipment has been rescheduled successfully.",
      });
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Failed to reschedule shipment:", error);
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  if (!shipmentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Shipment Details</h1>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
              Logout
            </button>
          ) : (
            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">
              Login
            </a>
          )}
          <button
            onClick={() => setIsWebSocketActive((prev) => !prev)}
            className="ml-4 px-4 py-2 bg-emerald-700 text-white rounded"
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
              {shipmentDetails.status === "DELIVERY_MISSED" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Reschedule Shipment
                </button>
              )}
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
              {hasChanges && (
                <button
                  onClick={handleSaveChanges}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save Changes
                </button>
              )}
            </div>

            <Separator />

            {shipmentDetails.reschedules && shipmentDetails.reschedules.status !== "ACCEPTED" && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Pending Reschedule</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">New Delivery Date: {shipmentDetails.reschedules.new_delivery_date}</p>
                    <p className="text-gray-600">New Location: {shipmentDetails.reschedules.new_location}</p>
                    <p className="text-gray-600">Custom Instructions: {shipmentDetails.reschedules.custom_instructions}</p>
                    <p className="text-gray-600">Status: {shipmentDetails.reschedules.status}</p>
                    {shipmentDetails.reschedules.admin_response && (
                      <p className="text-gray-600">Admin Response: {shipmentDetails.reschedules.admin_response}</p>
                    )}
                  </div>
                </div>

                <Separator />
              </>
            )}

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

      {isModalOpen && (
        <Modal onClose={() => { setIsModalOpen(false); window.location.reload(); }}>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Reschedule Shipment</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="new_delivery_date" className="block mb-2">New Delivery Date</Label>
                <Input
                  id="new_delivery_date"
                  name="new_delivery_date"
                  type="date"
                  value={rescheduleDetails.new_delivery_date}
                  onChange={handleRescheduleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <Label htmlFor="new_location" className="block mb-2">New Location (Optional)</Label>
                <Input
                  id="new_location"
                  name="new_location"
                  type="text"
                  value={rescheduleDetails.new_location}
                  onChange={handleRescheduleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <Label htmlFor="custom_instructions" className="block mb-2">Custom Instructions (Optional)</Label>
                <Input
                  id="custom_instructions"
                  name="custom_instructions"
                  type="text"
                  value={rescheduleDetails.custom_instructions}
                  onChange={handleRescheduleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <Button onClick={handleRescheduleSubmit} className="w-full py-2 bg-blue-600 text-white rounded">
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShipmentDetail;