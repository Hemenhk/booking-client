import TheTimeSlot from "./TheTimeSlot";
import { Appointment } from "@/types/types";

type Props = {
  hours: number[];
  daysOfWeek: Date[];
  appointmentsByDay: { date: string; appointments: Appointment[] }[];
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
