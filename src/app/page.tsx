"use client";

import { useQuery } from "@tanstack/react-query";
import { addDays, format, startOfWeek } from "date-fns";

import TheAppointmentForm from "@/components/form/TheAppointmentForm";
import TheWeeklyAppointments from "@/components/appointments/TheWeeklyAppointments";

export default function Home() {
  return (
    <main className="h-full flex justify-center items-center py-24 bg-gray-50">
     <TheWeeklyAppointments />
    </main>
  );
}
