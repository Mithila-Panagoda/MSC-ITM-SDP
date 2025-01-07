import { TrackingSearch } from "@/components/TrackingSearch";
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

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-primary">Track Your Shipment</h1>
          <TrackingSearch />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your Shipments</h2>
          <div className="grid gap-4">
            {mockShipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;