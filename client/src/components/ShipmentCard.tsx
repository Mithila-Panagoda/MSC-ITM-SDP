import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ShipmentCardProps {
  shipment: {
    id: string;
    status: string;
    tracking_id:string
    origin_location: string;
    destination_location: string;
    estimated_delivery_date: string;
  };
}

export const ShipmentCard = ({ shipment }: ShipmentCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-gray-500';
      case 'CONFIRMED':
        return 'bg-blue-500';
      case 'SHIPPED':
        return 'bg-purple-500';
      case 'IN_TRANSIT':
        return 'bg-orange-500';
      case 'DELIVERED':
        return 'bg-green-500';
      case 'DELIVERY_MISSED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/shipment/${shipment.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">Tracking ID: {shipment.tracking_id}</h3>
          <p className="text-sm text-gray-500">
            {shipment.origin_location} → {shipment.destination_location}
          </p>
        </div>
        <Badge
          variant="default"
          className={`capitalize ${getStatusColor(shipment.status)}`}
        >
          {shipment.status}
        </Badge>
      </div>
      <p className="text-sm text-gray-600">
        Estimated Delivery: {shipment.estimated_delivery_date}
      </p>
    </Card>
  );
};