"use client";
import TheSubUserAppointments from "@/components/appointments/TheSubUserAppointments";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";

export default function AppointmentDashboardPage() {
  const { storeHandle } = useParams<{ storeHandle: string }>();

  const { data: session } = useSession();

  const { isError, isLoading, subUsers, storeData, admin } =
    useAdminQuery(storeHandle);

  if (!session?.user) {
    return <div>Ingen användare tillgänglig</div>;
  }
  return (
    <Card>
      <CardContent>
        <TheSubUserAppointments selectedUserId={session.user.id} storeData={storeData} />
      </CardContent>
    </Card>
  );
}
