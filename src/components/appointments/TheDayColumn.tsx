import React from "react";
import TheAppointments from "./TheAppointments";
import { format } from "date-fns";
import { AppointmentType } from "@/lib/types";

type DayColumnProps = {
  day: {
    date: string;
    appointments: any;
  };
};

type DayColumnType = {
  date: string;
  appointments: any;
};

export default function TheDayColumn({ day }: DayColumnProps) {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const isCurrentDay = day.date === currentDate;

  const timeSlots = Array.from({ length: 10 }, (_, index) => {
    const hour = 9 + index; // from 9:00 to 18:00
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const renderTimeSlots = (day: DayColumnType) => {
    return timeSlots.map((timeSlot) => {
      const appointment = day.appointments?.find(
        (app: AppointmentType) => app.time === timeSlot
      );

      return (
        <div
          key={timeSlot}
          className="flex flex-col items-center justify-center border-[0.4px] border-slate-200 h-full"
        >
          {appointment ? (
            <TheAppointments appointment={appointment} />
          ) : (
            <div className="size-14 flexr" />
          )}
        </div>
      );
    });
  };

  return (
    <div key={day.date} className="flex flex-col">
      <h3 className="flex flex-col gap-2 items-center">
        <span
          className={`uppercase tracking-tight ${
            isCurrentDay ? "text-black font-medium" : "text-gray-400"
          }`}
        >
          {format(new Date(day.date), "eee")}
        </span>
        <div
          className={`flex flex-col w-8 gap-3 mb-5 text-center ${
            isCurrentDay &&
            "bg-black text-white flex justify-center items-center rounded-lg"
          }`}
        >
          {format(new Date(day.date), "d")}
        </div>
      </h3>
      
      <div className="grid grid-rows-10 flex-1">{renderTimeSlots(day)}</div>
    </div>
  );
}
