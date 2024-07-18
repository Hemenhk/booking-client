"use client";

import { AppointmentType } from "@/axios/bookAppointment";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AppointmentCardProps = {
  appointment: AppointmentType;
};

export default function TheAppointments({ appointment }: AppointmentCardProps) {
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

  const endTime = calculateEndTime(
    appointment.time,
    appointment.service.duration
  );

  return (
    <ul className="space-y-2">
      <Card key={appointment._id} className="shadow-md bg-cyan-50">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            {appointment.name} {appointment.last_name}
          </CardTitle>
          <CardDescription className="text-gray-500 tracking-wide text-base">
            {appointment.service.name}
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <p className="text-gray-500">
            Kl: {appointment.time} - {endTime}
          </p>
        </CardFooter>
      </Card>
    </ul>
  );
}
