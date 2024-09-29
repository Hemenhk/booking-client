"use client";
import { getAllUSerBookedAppointments } from "@/axios/standardUserAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointments, UserAppointments } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TheUserAppointmentDialog from "@/components/appointments/components/TheUserAppointmentDialog";

type Props = {
  appointmentData: UserAppointments;
};

export default function TheAppointmentsTable({ appointmentData }: Props) {
  console.log("appointments:", appointmentData);
  return (
    <Table className="max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Namn</TableHead>
          <TableHead>Pris</TableHead>
          <TableHead>Datum</TableHead>
          <TableHead className="text-right">Tid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointmentData?.appointments.map((appointment) => {
          const calculateEndTime = (startTime: string, duration: number) => {
            const [hours, minutes] = startTime.split(":").map(Number);
            const totalMinutes = hours * 60 + minutes + duration;
            const endHours = Math.floor(totalMinutes / 60);
            const endMinutes = totalMinutes % 60;
            return `${String(endHours).padStart(2, "0")}:${String(
              endMinutes
            ).padStart(2, "0")}`;
          };

          // Function to format the time range display
          const formatTimeRange = (startTime: string, endTime: string) => {
            return `${startTime} - ${endTime}`;
          };

          const endTime = calculateEndTime(
            appointment.time,
            appointment.service.duration
          );

          return (
            <TableRow key={appointment._id}>
              <Dialog>
                <DialogTrigger asChild>
                  <TableCell className="font-medium hover:underline cursor-pointer">
                    {appointment.service.name}
                  </TableCell>
                </DialogTrigger>
                <TheUserAppointmentDialog appointment={appointment}/>
              </Dialog>

              <TableCell>{appointment.service.price}kr</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell className="text-right">
                {formatTimeRange(appointment.time, endTime)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
