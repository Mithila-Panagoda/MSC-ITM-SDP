import { useEffect, useState } from "react";
import { TrackingSearch } from "@/components/TrackingSearch";
import { ShipmentCard } from "@/components/ShipmentCard";
import { getShipments } from "@/services/shipmentService"; // Import the getShipments function

const Home = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error("Failed to fetch shipments:", error);
      }
    };

    fetchShipments();
  }, []);

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
            {shipments.map((shipment) => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;