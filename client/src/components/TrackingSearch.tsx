import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const TrackingSearch = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) {
      navigate(`/shipment/${trackingId}`);
    }
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