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
import {
  getWeeklyBookedAppointments,
  ServiceType,
} from "@/axios/bookAppointment";
import { Button } from "../ui/button";
import TheAppointments from "./TheAppointments";

type Appointment = {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: ServiceType;
  date: string;
  time: string;
  status: string;
};

const bgColors = ["bg-cyan-50", "bg-yellow-50", "bg-pink-50", "bg-green-50"];

export default function TheWeeklyAppointments() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index)
  );
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["weekly-appointments", currentWeek],
    queryFn: getWeeklyBookedAppointments,
  });


  console.log("bookedData", bookedData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading appointments</div>;

  const timeSlots = Array.from({ length: 10 }, (_, index) => {
    const hour = 9 + index; // from 9:00 to 18:00
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const appointmentsByDay = daysOfWeek.map((day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    const appointments = bookedData?.filter((app: Appointment) => {
      const appDate = format(
        parse(app.date, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd"
      );
      return appDate === formattedDate;
    });

    console.log(`Appointments for ${formattedDate}:`, appointments);

    return {
      date: formattedDate,
      appointments,
    };
  });

  console.log("appointmentsByDay", appointmentsByDay);

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => subWeeks(prev, 1));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between mx-6">
        {appointmentsByDay?.map((day, dayIndex) => (
          <div key={day.date} className="flex-1 px-4 border-x">
            <h3 className={`mb-5 text-center w-36 ${day.date === currentDate && "bg-blue-600 text-white flex justify-center items-center rounded-full"}`}>
              {format(new Date(day.date), "EEEE, MMM d")}
            </h3>
            <ul className="py-5 border-t flex flex-col gap-3">
              {timeSlots.map((timeSlot, index) => {
                const appointment = day.appointments?.find(
                  (app: Appointment) => app.time === timeSlot
                );
                const bgColor = bgColors[index % bgColors.length];
                return (
                  <li
                    key={timeSlot}
                    className="flex flex-col items-center py-2"
                  >
                    <span>{timeSlot}</span>
                    {appointment ? (
                      <TheAppointments
                        appointment={appointment}
                        bgColor={bgColor}
                      />
                    ) : (
                      <div className="bg-red-200 p-2 rounded mt-1">
                        No appointment
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 w-full px-6">
        <Button onClick={handlePreviousWeek}>Previous Week</Button>
        <Button onClick={handleNextWeek}>Next Week</Button>
      </div>
    </div>
  );
}
