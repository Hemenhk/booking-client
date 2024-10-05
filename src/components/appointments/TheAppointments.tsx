"use client";

import {
  Card,
  CardDescription,
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
import {
  Clock,
  Phone,
  Clipboard,
  User,
  CircleDollarSign,
  Pen,
} from "lucide-react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBookedAppointment } from "@/axios/bookAppointment";
import TheUpdateAppointmentPriceForm from "../forms/updateServiceForm/TheUpdateAppointmentPriceForm";
import { useEffect, useState } from "react";

type AppointmentCardProps = {
  appointment: AppointmentType;
};

export default function TheAppointments({ appointment }: AppointmentCardProps) {
  const queryClient = useQueryClient();

  // Function to calculate the end time of the appointment
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

  // Function to format the time range display
  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  const endTime = calculateEndTime(
    appointment.time,
    appointment.service.duration
  );

  const gridContent = [
    {
      id: 1,
      icon: <Clipboard className="text-blue-600" />,
      title: "Service",
      content: appointment.service.name,
    },
    {
      id: 2,
      icon: <User className="text-blue-600" />,
      title: "Utövare",
      content: appointment.createdBy.name,
    },
    {
      id: 3,
      icon: <Clock className="text-blue-600" />,
      title: "Tid",
      content: formatTimeRange(appointment.time, endTime),
    },
    {
      id: 4,
      icon: <CircleDollarSign className="text-blue-600" />,
      title: "Pris",
      content: appointment.service.price,
    },
  ];

  const mappedGridContent = gridContent.map((con) => (
    <div className="flex items-center gap-2" key={con.title}>
      {con.icon}
      <div className="flex flex-col">
        <h3 className="text-gray-500 text-xs">{con.title}</h3>
        {con.id !== 4 ? (
          <p className="text-sm">{con.content}</p>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex flex-row gap-2 items-center">
                <p>{con.content}kr</p>
                <Pen size={13} className="cursor-pointer" />
              </div>
            </DialogTrigger>
            <TheUpdateAppointmentPriceForm
              appointmentId={appointment._id}
              appointmentPrice={appointment.service.price}
            />
          </Dialog>
        )}
      </div>
    </div>
  ));

  const { mutateAsync: cancelAppointmentMutation } = useMutation({
    mutationFn: (id: string) => cancelBookedAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-data"] });
      queryClient.invalidateQueries({ queryKey: ["sub-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-appointments"] });
      queryClient.refetchQueries({ queryKey: ["weekly-appointments"] });
      queryClient.refetchQueries({ queryKey: ["sub-appointments"] });
    },
  });

  // Calculate the height of the card based on the duration of the appointment
  const hourHeight = 80; // Assuming each hour cell is 64px tall
  const cardHeight = (appointment.service.duration / 60) * hourHeight;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          key={appointment._id}
          className={`shadow-sm rounded-lg p-0 m-0 cursor-pointer ${appointment?.service?.bgColor} transition duration-300 ease-out hover:brightness-90`}
          style={{ height: `${cardHeight}px` }}
        >
          <CardHeader className="flex gap-1 h-full flex-row space-y-0 p-0 m-0 items-center">
            <div className="h-full w-0.5 bg-blue-700" />
            <CardTitle className="text-xs md:text-sm font-normal text-gray-800 p-0 flex justify-center items-center">
              <span className="hidden md:flex">
                {appointment.name} {appointment.last_name}
              </span>
              <span className="md:hidden">
                {formatTimeRange(appointment.time, endTime)}
                {"  "} {appointment.name} {appointment.last_name}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader className="border-b py-5">
          <DialogTitle>
            {appointment.name} {appointment.last_name}
          </DialogTitle>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={15} />
              {appointment.phone_number}
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineEnvelope />
              <span className="underline">{appointment.email}</span>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">{mappedGridContent}</div>
        <div className="border-t pt-5 mt-5 flex justify-end gap-2">
          <Button
            className="w-32"
            onClick={() => cancelAppointmentMutation(appointment._id)}
          >
            Avboka
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
