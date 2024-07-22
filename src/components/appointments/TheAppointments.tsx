"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Phone } from "lucide-react";
import { HiOutlineEnvelope } from "react-icons/hi2";

type AppointmentCardProps = {
  appointment: AppointmentType;
  bgColor: string;
};

const bgColors = ["bg-cyan-50", "bg-yellow-50", "bg-pink-50"];

export default function TheAppointments({
  appointment,
  bgColor,
}: AppointmentCardProps) {
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
    <Dialog>
      <Card key={appointment._id} className={`shadow-md ${bgColor}`}>
        <CardHeader>
          <DialogTrigger asChild className="cursor-pointer">
            <CardTitle className="text-sm font-medium">
              {appointment.name} {appointment.last_name}
            </CardTitle>
          </DialogTrigger>
          <CardDescription className="text-gray-500 tracking-wider text-xs">
            {appointment.service.name}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <p className="text-gray-500 text-xs">
            Kl: {appointment.time} - {endTime}
          </p>
        </CardFooter>
      </Card>
      <DialogContent>
        <DialogHeader className="border-b py-5 space-y-4">
          <DialogTitle>
            {appointment.name} {appointment.last_name}
          </DialogTitle>
          <div className="flex items-center gap-5 text-gray-600">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={15} />
              {appointment.phone_number}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <HiOutlineEnvelope />
              <span className="underline">{appointment.email}</span>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1">
            <h3 className="text-gray-600 font-medium text-sm">Service</h3>
            <p>{appointment.service.name}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-gray-600 font-medium text-sm">Barber</h3>
            <p>Hemen HK</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-gray-600 font-medium text-sm">Time</h3>
            <p>
              {appointment.time} - {endTime}
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-gray-600 font-medium text-sm">Price</h3>
            <p>{appointment.service.price} kr</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
