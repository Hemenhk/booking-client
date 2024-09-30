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
import Link from "next/link";

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
          <TableHead>Verksamhet</TableHead>
          <TableHead className="text-right">Tid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointmentData?.appointments
          .sort((a, b) => {
            // Manually convert the date string from DD/MM/YYYY to MM/DD/YYYY for proper parsing
            const parseDate = (dateStr: string) => {
              const [day, month, year] = dateStr.split("/").map(Number);
              return new Date(year, month - 1, day).getTime(); // month - 1 because JS months are zero-indexed
            };

            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);

            return dateB - dateA; // Sort descending (most recent first)
          })
          .map((appointment) => {
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
                <TableCell className="font-medium hover:underline cursor-pointer">
                  {appointment.service.name}
                </TableCell>

                <TableCell>{appointment.service.price}kr</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>
                  <Link href={`/store/${appointment.createdBy.store.handle}`}>
                    {" "}
                    {appointment.createdBy.store.name}
                  </Link>
                </TableCell>
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
