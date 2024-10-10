import { getBookedAppointmentsForSubuser } from "@/axios/bookAppointment";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { format, parse, isAfter } from "date-fns"; // Import isAfter to compare times
import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, Clock, DollarSign, User } from "lucide-react";

export default function TheDailyAppointments() {
  const { data: session } = useSession();

  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["sub-appointments", session?.user.id],

    queryFn: () => {
      if (session?.user.id) {
        return getBookedAppointmentsForSubuser(session?.user.id);
      }
      return Promise.reject(new Error("User ID is undefined"));
    },
  });

  // Get today's date and current time
  const todayDate = format(new Date(), "dd/MM/yyyy");
  const currentTime = new Date();

  if (isLoading) {
    return <div>Laddar bokningar...</div>;
  }

  if (isError) {
    return <div>Ett fel uppstod!</div>;
  }

  if (!bookedData || bookedData.length === 0) {
    return <div>Inga bokningar idag</div>;
  }

  // Filter and sort the appointments for today, and exclude past times
  const todayAppointments = bookedData
    .filter((appointment) => {
      // Parse the appointment date and time
      const appointmentDate = parse(appointment.date, "dd/MM/yyyy", new Date());
      const appointmentTime = parse(appointment.time, "HH:mm", new Date());

      // Check if the appointment is today and the time is in the future
      return (
        format(appointmentDate, "dd/MM/yyyy") === todayDate &&
        isAfter(appointmentTime, currentTime)
      );
    })
    .sort((a, b) => {
      // Sort appointments by time (ascending order)
      const timeA = parse(a.time, "HH:mm", new Date());
      const timeB = parse(b.time, "HH:mm", new Date());
      return timeA.getTime() - timeB.getTime();
    });

  // Get the next three appointments
  const nextThreeAppointments = todayAppointments.slice(0, 3);

  if (nextThreeAppointments.length === 0) {
    return <div>Inga kommande bokningar idag</div>;
  }

  return (
    <div className="h-full flex flex-col pl-3 w-full">
      <h2 className="font-semibold text-2xl tracking-tight mb-8">
        Kommande bokningar idag
      </h2>
      <ul className="flex flex-col md:flex-row md:items-center gap-3">
        {nextThreeAppointments.map((appointment) => {
          // Function to calculate the end time of the appointment
          const calculateEndTime = (startTime: string, duration: number) => {
            const [hours, minutes] = startTime.split(":").map(Number);
            const totalMinutes = hours * 60 + minutes + duration;
            const endHours = Math.floor(totalMinutes / 60);
            const endMinutes = totalMinutes % 60;
            return `${String(endHours).padStart(2, "0")}:${String(
              endMinutes
            ).padStart(2, "0")}`;
          };

          // Function to format the time range display
          const formatTimeRange = (startTime: string, endTime: string) => {
            return `${startTime} - ${endTime}`;
          };

          const endTime = calculateEndTime(
            appointment.time,
            appointment.service.duration
          );
          // Create an array of objects representing the appointment details
          const appointmentDetails = [
            {
              icon: <Clock size={15} />,
              label: "Tid",
              value: formatTimeRange(appointment.time, endTime),
            },
            {
              icon: <User size={15} />,
              label: "Kund",
              value: `${appointment.name} ${appointment.last_name}`,
            },
            {
              icon: <Clipboard size={15} />,
              label: "Tjänst",
              value: appointment.service.name,
            },
            {
              icon: <DollarSign size={15} />,
              label: "Pris",
              value: `${appointment.service.price} kr`,
            },
          ];

          return (
            <Card
              key={appointment._id}
              className={`w-full flex flow-row max-w-[350px] p-2 ${appointment.service.bgColor}`}
            >
              <div className="h-full w-0.5 bg-blue-600" />
              <CardContent className="p-2">
                {appointmentDetails.map((detail, index) => (
                  <p
                    key={index}
                    className="flex flex-row items-center gap-3 text-gray-700"
                  >
                    {detail.icon && detail.icon} {/* Render icon if present */}
                    <strong>{detail.label}:</strong> {detail.value}
                  </p>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}
