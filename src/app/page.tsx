"use client";
import {
  AppointmentType,
  getAllBookedAppointments,
} from "@/axios/bookAppointment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

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

  const mappedBookedData = bookedData?.map((appointment: AppointmentType) => (
    <Card key={appointment._id}>
      <CardHeader>
        <CardTitle className="text-lg">{appointment.name}{" "}{appointment.last_name}</CardTitle>
        <CardDescription>{appointment.service.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>{appointment.date}</p>
        <p className="pl-5">Kl: {appointment.time}</p>
      </CardFooter>
    </Card>
  ));
  return (
    <main className="h-full flex justify-center items-center py-24 bg-gray-50">{mappedBookedData}</main>
  );
}
