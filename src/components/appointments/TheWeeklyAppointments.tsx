"use client";

import { useQuery } from "@tanstack/react-query";
import { addDays, format, startOfWeek, parse, addWeeks, subWeeks } from "date-fns";
import React, { useState } from "react";
import {
  getWeeklyBookedAppointments,
  ServiceType,
} from "@/axios/bookAppointment";
import TheAppointments from "./TheAppointments";
import { Button } from "../ui/button";

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

export default function TheWeeklyAppointments() {
    const [currentWeek, setCurrentWeek] = useState(new Date())
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index)
  );

  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["weekly-appointments"],
    queryFn: getWeeklyBookedAppointments,
  });

  console.log("bookedData", bookedData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading appointments</div>;

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
         <div className="flex justify-between border mx-6">
      {appointmentsByDay?.map((day) => (
        <div key={day.date} className="flex-1 p-3 m-1 rounded">
          <h3 className="pb-5">{format(new Date(day.date), "EEEE, MMM d")}</h3>
          <ul className="py-5 border-t flex flex-col gap-3">
            {day.appointments && day.appointments.length > 0 ? (
              day.appointments.map((app: Appointment) => (
                <TheAppointments appointment={app} key={app._id} />
              ))
            ) : (
              <li>No appointments</li>
            )}
          </ul>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-4 w-full px-6">
        <Button
          onClick={handlePreviousWeek}
        >
          Previous Week
        </Button>
        <Button
          onClick={handleNextWeek}
        >
          Next Week
        </Button>
      </div>
    </div>
   
  );
}
