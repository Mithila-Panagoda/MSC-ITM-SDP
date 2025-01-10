import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { getShipmentByTrackingId } from "@/services/shipmentService";
import { toast } from "@/components/ui/use-toast";

export const TrackingSearch = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) {
      try {
        const shipment = await getShipmentByTrackingId(trackingId);
        console.log("shipment", shipment);
        if (shipment) {
          navigate(`/shipment/${shipment.id}`);
        } else {
          showErrorToast("Tracking ID is incorrect");
        }
      } catch (error) {
        console.error("Failed to fetch shipment:", error);
        showErrorToast("Tracking ID is incorrect");
      }
    }
  };

  const showErrorToast = (message: string) => {
    toast({
      title: "Tracking ID Not Found",
      description: "Please check the tracking ID and try again",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
      <Input
        type="text"
        placeholder="Enter tracking number"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="bg-secondary hover:bg-secondary/90">
        Track
      </Button>
    </form>
  );
};