import React from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { motion } from "framer-motion";

const EventTable = ({ events, isLoading }) => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } },
  };

  return (
    <Card className="bg-white text-blue-900">
      <CardHeader>
        <CardTitle>Historique des événements</CardTitle>
        <CardDescription>
          Voir la liste de tous vos événements précédemment ajoutés.
        </CardDescription>
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
                    <TableCell>
                      {new Date(event.time).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(event.date).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>{event.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventTable;
