import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DateTimePicker from "@/components/DateTimePicker";
import { motion } from "framer-motion";

const EventDialog = ({ isDialogOpen, setIsDialogOpen, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      date: new Date(),
      time: new Date(),
      description: "",
    },
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    setIsDialogOpen(false);
  };

  const dialogVariants = {
    hidden: { opacity: 0, y: -200 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="fixed bottom-4 right-4"
        >
          Ajouter un événement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white text-blue-900">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={dialogVariants}
        >
          <DialogHeader>
            <DialogTitle>Ajouter un événement</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire pour ajouter un nouvel événement.
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
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
                  <Textarea
                    id="event-description"
                    placeholder="Description de l'événement"
                    {...field}
                  />
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white">
                Enregistrer l'événement
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Fermer
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
