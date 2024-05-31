"use client";
import React, { useEffect, useState } from "react";
import EventDialog from "@/components/maincourante/EventDialog";
import EventTable from "@/components/maincourante/EventTable";

const MaincourantePage = () => {
  const [isClient, setIsClient] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    const response = await fetch("/api/events", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    } else {
      console.error("Failed to fetch events");
    }
    setIsLoading(false);
  };

  const handleAddEvent = async (data: {
    date: Date;
    time: Date;
    description: string;
  }) => {
    setIsLoading(true);
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      fetchEvents();
    } else {
      console.error("Failed to add event");
    }
    setIsLoading(false);
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="bg-white text-blue-900 min-h-screen p-4">
      <EventDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onSubmit={handleAddEvent}
      />
      <div className="mt-8">
        <EventTable events={events} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default MaincourantePage;
