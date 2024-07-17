"use client";
import {
  AppointmentType,
  getAllBookedAppointments,
} from "@/axios/bookAppointment";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function Home() {
  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["appointment"],
    queryFn: getAllBookedAppointments,
  });

  console.log("all appointments", bookedData);

  const appointmentDuration = bookedData?.map((time) => time.time);

  console.log("duration", appointmentDuration);

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const mappedBookedData = bookedData?.map((appointment: AppointmentType) => {
    const endTime = calculateEndTime(appointment.time, appointment.service.duration);


    return (
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
          <p className="text-gray-500">Kl: {appointment.time} - {endTime}</p>
        </CardFooter>
      </Card>
    );
  });
  return (
    <main className="h-full flex justify-center items-center py-24 bg-gray-50">
      {mappedBookedData}
    </main>
  );
}
