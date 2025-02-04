import { useEffect, useState } from "react";
import { TrackingSearch } from "@/components/TrackingSearch";
import { ShipmentCard } from "@/components/ShipmentCard";
import { getShipments } from "@/services/shipmentService"; // Import the getShipments function
import { isAuthenticated, logout } from "@/services/userService"; // Import isAuthenticated and logout functions

const Home = () => {
  const [shipments, setShipments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

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

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Track Your Shipment</h1>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
              Logout
            </button>
          ) : (
            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">
              Login
            </a>
          )}
        </div>
        <TrackingSearch />
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