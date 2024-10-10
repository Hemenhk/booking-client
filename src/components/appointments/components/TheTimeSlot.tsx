"use client";
import TheAppointments from "../TheAppointments";
import {
  addMinutes,
  format,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import { Appointment } from "@/types/types";

type Props = {
  hour: number;
  daysOfWeek: Date[];
  appointmentsByDay: { date: string; appointments: Appointment[] }[];
};

export default function TheTimeSlot({
  appointmentsByDay,
  daysOfWeek,
  hour,
}: Props) {
  return (
    <div className="flex">
      {/* Time label on the left */}
      <div className="w-16 h-20 text-center pt-2 px-2 border-gray-100 text-gray-500 text-sm font-light relative bottom-4">
        {`${hour}:00`}
      </div>

      {/* Time slots for each day */}
      {daysOfWeek.map((day, dayIndex) => {
        const formattedDate = format(day, "yyyy-MM-dd");

        const appointments = appointmentsByDay[dayIndex]?.appointments?.filter(
          (appointment: Appointment) => {
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
            return (
              (isAfter(appointmentEndTime, slotStartTime) &&
                isBefore(appointmentStartTime, slotEndTime)) ||
              (getHours(appointmentStartTime) === hour &&
                getMinutes(appointmentStartTime) === 0)
            );
          }
        );

        return (
          <div key={dayIndex} className="flex-1 border-[0.4px] border-gray-300">
            {/* Render multiple appointments if available */}
            {appointments?.map((appointment: Appointment) => (
              <div key={appointment._id} className="mb-1">
                <TheAppointments appointment={appointment} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
