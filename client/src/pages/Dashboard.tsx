import { ShipmentCard } from "@/components/ShipmentCard";

// Mock data - replace with real API call
const mockShipments = [
  {
    id: "TRK123456",
    status: "in transit",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    estimatedDelivery: "2024-03-20",
  },
  {
    id: "TRK789012",
    status: "delivered",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    estimatedDelivery: "2024-03-15",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary">Your Shipments</h1>
        <div className="grid gap-4">
          {mockShipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;