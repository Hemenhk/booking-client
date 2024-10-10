"use client";
import TheSubUserAppointments from "@/components/appointments/TheSubUserAppointments";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import React from "react";

export default function AppointmentDashboardPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>Ingen användare tillgänglig</div>;
  }
  return (
    <Card>
      <CardContent>
        <TheSubUserAppointments selectedUserId={session.user.id} />
      </CardContent>
    </Card>
 
  );
}
