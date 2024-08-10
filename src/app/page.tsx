"use client";

import TheWeeklyAppointments from "@/components/appointments/TheWeeklyAppointments";
import TheAppointmentForm from "@/components/form/TheAppointmentForm";

export default function Home() {
  return (
    <main className="flex justify-center items-center py-24 bg-gradient-to-r from-lime-50 via-orange-50  to-violet-50">
      <TheAppointmentForm />
    </main>
  );
}
