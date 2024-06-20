"use client";
import React, { useEffect, useState, useCallback } from "react";
import EventDialog from "@/components/maincourante/EventDialog";
import EventTable from "@/components/maincourante/EventTable";

interface Event {
  id: number;
  date: Date;
  time: Date;
  description: string;
}

const MaincourantePage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAddEvent = useCallback(
    async (data: { date: Date; time: Date; description: string }) => {
      if (!data.date || !data.time || !data.description) {
        alert("Veuillez remplir tous les champs avant d'ajouter un événement.");
        return;
      }

      setIsLoading(true);
      try {
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
          throw new Error("Failed to add event");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchEvents]
  );

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
