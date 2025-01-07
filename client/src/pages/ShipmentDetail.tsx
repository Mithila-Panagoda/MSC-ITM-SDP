import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data - replace with real API call
const mockShipmentDetails = {
  id: "TRK123456",
  status: "in transit",
  origin: "New York, NY",
  destination: "Los Angeles, CA",
  estimatedDelivery: "2024-03-20",
  updates: [
    {
      id: 1,
      timestamp: "2024-03-15 10:00 AM",
      status: "Package picked up",
      location: "New York Sorting Facility",
    },
    {
      id: 2,
      timestamp: "2024-03-15 2:30 PM",
      status: "In transit",
      location: "Newark Distribution Center",
    },
  ],
  notifications: {
    email: true,
    sms: false,
    push: false,
  },
};

const ShipmentDetail = () => {
  const { id } = useParams();

  const handleNotificationChange = (type: "email" | "sms" | "push", checked: boolean) => {
    toast({
      title: "Notification preferences updated",
      description: `${type} notifications have been ${checked ? 'enabled' : 'disabled'}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Shipment Details</h1>
          <Badge variant="secondary" className="capitalize">
            {mockShipmentDetails.status}
          </Badge>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Tracking Information</h2>
              <p className="text-gray-600">Tracking ID: {id}</p>
              <p className="text-gray-600">
                From: {mockShipmentDetails.origin} → To:{" "}
                {mockShipmentDetails.destination}
              </p>
              <p className="text-gray-600">
                Estimated Delivery: {mockShipmentDetails.estimatedDelivery}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-notifications"
                    checked={mockShipmentDetails.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked as boolean)}
                  />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms-notifications"
                    checked={mockShipmentDetails.notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked as boolean)}
                  />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="push-notifications"
                    checked={mockShipmentDetails.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked as boolean)}
                  />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">Shipment Updates</h2>
              <div className="space-y-4">
                {mockShipmentDetails.updates.map((update) => (
                  <div key={update.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{update.status}</p>
                        <p className="text-sm text-gray-600">{update.location}</p>
                      </div>
                      <p className="text-sm text-gray-500">{update.timestamp}</p>
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