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
import { format, parse, differenceInHours } from "date-fns";
import { sv } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { Ban } from "lucide-react";

export default function CancelAppointmentPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  const { appointmentId } = params;
  const { toast, dismiss } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isTooLate, setIsTooLate] = useState(false);

  const {
    data: appointmentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-appointment", appointmentId],
    queryFn: () => getSingleAppointment(appointmentId),
  });

  const { mutateAsync: cancelAppointmentMutation } = useMutation({
    mutationFn: (appointmentId: string) =>
      cancelBookedAppointment(appointmentId),
    onSuccess: () => {
      toast({
        title: `Din tid hos ${appointmentData.appointment.createdBy.store.name} avbokades!`,
      });

      setTimeout(() => {
        router.push("/");
        dismiss();
      }, 2000);

      queryClient.invalidateQueries({ queryKey: ["available-data"] });
      queryClient.invalidateQueries({ queryKey: ["sub-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-appointments"] });
    },
  });

  useEffect(() => {
    if (appointmentData) {
      const appointmentDateTime = parse(
        `${appointmentData.appointment.date} ${appointmentData.appointment.time}`,
        "dd/MM/yyyy HH:mm",
        new Date()
      );
      const hoursDifference = differenceInHours(
        appointmentDateTime,
        new Date()
      );

      if (hoursDifference < 24) {
        setIsTooLate(true);
      }
    }
  }, [appointmentData]);

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

  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  const endTime = calculateEndTime(
    appointmentData.appointment.time,
    appointmentData.appointment.service.duration
  );
  const formattedDate = format(
    parse(appointmentData.appointment.date, "dd/MM/yyyy", new Date()),
    "EEEE, d MMMM yyyy",
    { locale: sv }
  );

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
          {isTooLate && (
            <Card className="overflow-hidden max-w-[600px] border-red-700">
              <CardContent className="flex flex-row items-center gap-3 py-2">
                <Ban size={30} className="text-red-700" />
                <p className="flex flex-row items-center gap-5 text-sm">
                  Det är för sent att avboka denna tid. Avbokning är tillåten
                  fram till 24 timmar innan. Kontakta din utövare för att se vad
                  de kan hjälpa dig med:{" "}
                  {appointmentData.appointment.createdBy.store.phone_number}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter className="pt-6 border-t">
          <Button
            className="w-full font-light text-base"
            onClick={() => cancelAppointmentMutation(appointmentId)}
            disabled={isTooLate}
          >
            Avboka
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
