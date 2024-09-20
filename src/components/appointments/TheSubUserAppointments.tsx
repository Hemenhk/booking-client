"use client";
import {
  format,
  addDays,
  startOfWeek,
  parse,
  getHours,
  getMinutes,
  addMinutes,
  isBefore,
  isAfter,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookedAppointmentsForSubuser } from "@/axios/bookAppointment";
import { AppointmentType } from "@/lib/types";
import TheAppointments from "./TheAppointments";
import TheTimeLine from "./TheTimeLine";

type Props = {
  selectedUserId: string ;
};
export default function TheSubUserAppointments({ selectedUserId }: Props) {
  // Set up the start of the week and the hours
  const startOfTheWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as the first day of the week
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfTheWeek, index)
  );
  const hours = Array.from({ length: 10 }).map((_, index) => index + 9); // Hours from 9 to 18

  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["sub-appointments", selectedUserId],
    queryFn: () => getBookedAppointmentsForSubuser(selectedUserId),
  });



  if (isLoading) {
    return <div>Laddar data...</div>;
  }
  if (isError) {
    return <div>Ett fel uppstod när datan hämtades</div>;
  }

  console.log("appointments", bookedData)

   // Group appointments by day
   const appointmentsByDay = daysOfWeek.map((day) => {
    const formattedDate = format(day, "yyyy-MM-dd");

    return {
      date: formattedDate,
      appointments: bookedData?.filter((appointment: AppointmentType) => {
        const appointmentDate = format(
          parse(appointment.date, "dd/MM/yyyy", new Date()),
          "yyyy-MM-dd"
        );
        return appointmentDate === formattedDate;
      }),
    };
  });

  return (
    <div className="flex flex-col h-full m-8 relative">
      {/* Time line with current time text */}
      <TheTimeLine />
      <div className="flex">
        {/* First cell is empty */}
        <div className="w-16"></div>
        {/* Render day headers */}
        {daysOfWeek.map((day, index) => (
          <div key={index} className="flex-1 text-center p-3 border-gray-100">
            {format(day, "EEE, MMM d")}
          </div>
        ))}
      </div>
      {/* Render time slots */}
      {hours.map((hour) => (
        <div key={hour} className="flex">
          {/* Time label on the left */}
          <div className="w-16 h-20 text-center pt-2 px-2 border-gray-100 text-gray-500 text-sm font-light relative bottom-4">
            {`${hour}:00`}
          </div>
          {/* Time slots for each day */}
          {daysOfWeek.map((day, dayIndex) => {
            const formattedDate = format(day, "yyyy-MM-dd");

            // Find appointments that either start or overlap with the current hour
            const appointments = appointmentsByDay[
              dayIndex
            ].appointments?.filter((appointment: AppointmentType) => {
              const appointmentStartTime = parse(
                `${appointment.date} ${appointment.time}`,
                "dd/MM/yyyy HH:mm",
                new Date()
              );
              const appointmentEndTime = addMinutes(
                appointmentStartTime,
                appointment.service.duration
              );

              const slotStartTime = new Date(formattedDate).setHours(
                hour,
                0,
                0,
                0
              );
              const slotEndTime = new Date(formattedDate).setHours(
                hour + 1,
                0,
                0,
                0
              );

              // Check if the appointment starts or ends within the current hour slot
              return (
                (isAfter(appointmentEndTime, slotStartTime) &&
                  isBefore(appointmentStartTime, slotEndTime)) ||
                (getHours(appointmentStartTime) === hour &&
                  getMinutes(appointmentStartTime) === 0)
              );
            });

            return (
              <div
                key={dayIndex}
                className="flex-1 border-[0.4px] border-gray-300"
              >
                {/* Render multiple appointments if available */}
                {appointments?.map((appointment: AppointmentType) => (
                  <div key={appointment._id} className="mb-1">
                    <TheAppointments appointment={appointment} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
