"use client"
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import { motion } from "framer-motion";
import { SVGProps } from "react";
import "./global.css";

registerLocale("fr", fr);

function CalendarDaysIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

interface Event {
  time: string;
  date: string;
  description: string;
}

const DateTimePicker = ({ label, name, control, showTimeSelect, dateFormat }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelect}
            timeIntervals={15}
            timeCaption="Heure"
            dateFormat={dateFormat}
            className="w-full"
            locale="fr"
          />
        )}
      />
    </div>
  );
};

const MaincourantePage = () => {
  const [isClient, setIsClient] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      date: new Date(),
      time: new Date(),
      description: "",
    },
  });

  useEffect(() => {
    setIsClient(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    const response = await fetch('/api/events', {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    } else {
      console.error('Failed to fetch events');
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: { date: Date; time: Date; description: string }) => {
    setIsLoading(true);
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      fetchEvents();
      reset();
      setIsDialogOpen(false);
    } else {
      console.error('Failed to add event');
    }
    setIsLoading(false);
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  const dialogVariants = {
    hidden: { opacity: 0, y: -200 },
    visible: { opacity: 1, y: 0 }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } }
  };

  return (
    <div className="bg-white text-blue-900 min-h-screen p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)} className="fixed bottom-4 right-4">Ajouter un événement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-white text-blue-900">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={dialogVariants}
          >
            <DialogHeader>
              <DialogTitle>Ajouter un événement</DialogTitle>
              <DialogDescription>Remplissez le formulaire pour ajouter un nouvel événement.</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
                <DateTimePicker
                  label="Heure"
                  name="time"
                  control={control}
                  showTimeSelect={true}
                  dateFormat="HH:mm"
                />
                <DateTimePicker
                  label="Date"
                  name="date"
                  control={control}
                  showTimeSelect={false}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea id="event-description" placeholder="Description de l'événement" {...field} />
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-500 text-white">Enregistrer l'événement</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Fermer</Button>
              </DialogFooter>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
      <div className="mt-8">
        <Card className="bg-white text-blue-900">
          <CardHeader>
            <CardTitle>Historique des événements</CardTitle>
            <CardDescription>Voir la liste de tous vos événements précédemment ajoutés.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={tableVariants}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Heure</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(event.time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>{event.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaincourantePage;
