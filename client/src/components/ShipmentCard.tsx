import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ShipmentCardProps {
  shipment: {
    id: string;
    status: string;
    origin: string;
    destination: string;
    estimatedDelivery: string;
  };
}

export const ShipmentCard = ({ shipment }: ShipmentCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/shipment/${shipment.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">Tracking ID: {shipment.id}</h3>
          <p className="text-sm text-gray-500">
            {shipment.origin} → {shipment.destination}
          </p>
        </div>
        <Badge
          variant="secondary"
          className="capitalize"
        >
          {shipment.status}
        </Badge>
      </div>
      <p className="text-sm text-gray-600">
        Estimated Delivery: {shipment.estimatedDelivery}
      </p>
    </Card>
  );
};