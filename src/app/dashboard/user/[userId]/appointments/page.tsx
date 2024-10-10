"use client";
import { getAllUSerBookedAppointments } from "@/axios/standardUserAppointments";
import TheAppointmentsTable from "@/components/dashboard/appointmentsTable/TheAppointmentsTable";
import { TheSkeletonCard } from "@/components/skeletons/TheSkeletonCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAppointments } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function UserAppointmentPage() {
  const { data: session } = useSession();
  const email = session?.user.email;

  const {
    data: appointmentData,
    isError,
    isLoading,
  } = useQuery<UserAppointments>({
    queryKey: ["user-appointments"],
    queryFn: () => {
      if (email) {
        return getAllUSerBookedAppointments(email);
      }
      return Promise.reject(new Error("User email is undefined"));
    },
  });

  if (!appointmentData){
    return <div>Finns ingen data</div>
  }

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full p-4 pt-10">
        <TheSkeletonCard />
      </div>
    );
  }

  if (isError){
    return <div>Ett fel uppstod...</div>
  }


  return (
    <Card className="max-w-[800px]">
      <CardHeader className="flex flex-row justify-between">
        <h3 className="text-lg font-medium">
          Alla bokningar:{" "}
          <span className="text-base font-normal pl-2">
            {appointmentData?.appointments.length}
          </span>
        </h3>
       
      </CardHeader>
      <CardContent>
        <TheAppointmentsTable appointmentData={appointmentData}/>
      </CardContent>
    </Card>
  );
}
