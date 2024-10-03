import { AppointmentType } from "@/lib/types";
import TheTimeSlot from "./TheTimeSlot";

type Props = {
  hours: number[];
  daysOfWeek: Date[];
  appointmentsByDay: { date: string; appointments: AppointmentType[] }[];
};

export default function TheAppointmentsByDay({
  hours,
  daysOfWeek,
  appointmentsByDay,
}: Props) {
  return (
    <div>
      {hours.map((hour) => (
        <TheTimeSlot
          key={hour}
          hour={hour}
          daysOfWeek={daysOfWeek}
          appointmentsByDay={appointmentsByDay}
        />
      ))}
    </div>
  );
}
