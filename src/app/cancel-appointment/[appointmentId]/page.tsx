"use client";

import {
  cancelBookedAppointment,
  getSingleAppointment,
} from "@/axios/bookAppointment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { sv } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function CancelAppointmentPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  const { appointmentId } = params;
  const { toast, dismiss } = useToast();
  const router = useRouter();

  const {
    data: appointmentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-appointment", appointmentId],
    queryFn: () => getSingleAppointment(appointmentId),
  });

  const queryClient = useQueryClient();

  // Use mutation with proper handling of onSuccess without unnecessary refetch
  const { mutateAsync: cancelAppointmentMutation } = useMutation({
    mutationFn: (appointmentId: string) =>
      cancelBookedAppointment(appointmentId),
    onSuccess: () => {
      // Show toast notification on success
      toast({
        title: `Din tid hos ${appointmentData.appointment.createdBy.store.name} avbokades!`,
      });

      // Redirect after the toast appears
      setTimeout(() => {
        router.push("/");
        dismiss(); // Dismiss the toast after the redirect
      }, 2000); // Set a slight delay to show the toast

      // Invalidate relevant queries to update data after the appointment is canceled
      queryClient.invalidateQueries({ queryKey: ["available-data"] });
      queryClient.invalidateQueries({ queryKey: ["sub-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-appointments"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full justify-center items-center">
        <MoonLoader size={30} />
      </div>
    );
  }

  if (isError) {
    return <div>Ett fel uppstod när vi skulle hämta din bokningsdata</div>;
  }

  // Calculate end time of appointment
  const calculateEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(
      2,
      "0"
    )}`;
  };

  // Format time range for display
  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  // Calculate end time and format the date
  const endTime = calculateEndTime(
    appointmentData.appointment.time,
    appointmentData.appointment.service.duration
  );
  const formattedDate = format(
    parse(appointmentData.appointment.date, "dd/MM/yyyy", new Date()), // Parse the date string to a Date object
    "EEEE, d MMMM yyyy", // Format: "Thursday, 10 October 2024"
    { locale: sv } // Optional: Use Swedish locale or omit for default (English)
  );

  console.log("appointmentId", appointmentId);
  console.log("app", appointmentData);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Card className="min-w-96 max-w-2xl text-center">
        <CardHeader>
          <CardTitle>Avboka din tid</CardTitle>
          <CardDescription>
            Avboka din tid hos{" "}
            {appointmentData.appointment.createdBy.store.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="bg-neutral-100 rounded-lg p-2 flex flex-row items-center justify-between text-sm">
            <p>
              <span className="font-medium">Tjänst:</span>{" "}
              {appointmentData.appointment.service.name}
            </p>
            <p>
              <span className="font-medium">Tid:</span> kl{" "}
              {formatTimeRange(appointmentData.appointment.time, endTime)}
            </p>
          </div>
          <div className="bg-neutral-100 rounded-lg p-2 flex flex-row items-center justify-between text-sm">
            <p className="capitalize">
              <span className="font-medium">Datum: </span>
              {formattedDate}
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-6 border-t">
          <Button
            className="w-full font-light text-base"
            onClick={() => cancelAppointmentMutation(appointmentId)}
          >
            Avboka
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
