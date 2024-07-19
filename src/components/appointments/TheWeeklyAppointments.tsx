"use client";

import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  format,
  startOfWeek,
  parse,
  addWeeks,
  subWeeks,
} from "date-fns";
import React, { useState } from "react";
import { getWeeklyBookedAppointments } from "@/axios/bookAppointment";
import { Button } from "../ui/button";
import TheDayColumn from "./TheDayColumn";
import { AppointmentType } from "@/lib/types";

export default function TheWeeklyAppointments() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index)
  );

  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["weekly-appointments", currentWeek],
    queryFn: getWeeklyBookedAppointments,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading appointments</div>;

  const appointmentsByDay = daysOfWeek.map((day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    const appointments = bookedData?.filter((app: AppointmentType) => {
      const appDate = format(
        parse(app.date, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd"
      );
      return appDate === formattedDate;
    });

    return {
      date: formattedDate,
      appointments,
    };
  });

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => subWeeks(prev, 1));
  };

  return (
    <div className="flex flex-col gap-5 h-full p-10">
       {/* <div className="grid grid-cols-8 gap-0">
        <div className="flex flex-col">
          {timeSlots.map((timeSlot) => (
            <div
              key={timeSlot}
              className="flex items-center justify-center h-full"
              style={{ height: "rem" }} // Adjust height to match the height of time slots in Day columns
            >
              {timeSlot}
            </div>
          ))}
        </div>

        {appointmentsByDay?.map((day, dayIndex) => (
          <TheDayColumn day={day} key={dayIndex} />
        ))}
      </div> */}
      <div className="grid grid-cols-7 gap-0">
        {appointmentsByDay?.map((day, dayIndex) => (
          <TheDayColumn day={day} key={dayIndex} />
        ))}
      </div>
      <div className="flex justify-between mt-4 w-full px-6">
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
      </div>
    </div>
  );
}
