"use client";
import { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  parse,
  getHours,
  getMinutes,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyBookedAppointments } from "@/axios/bookAppointment";
import { AppointmentType } from "@/lib/types";
import TheAppointments from "./TheAppointments";
import TheTimeLine from "./TheTimeLine";

export default function TheWeeklyAppointments() {
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
    queryKey: ["weekly-appointments"],
    queryFn: getWeeklyBookedAppointments,
  });

  if (isLoading) {
    return <div>Laddar data...</div>;
  }
  if (isError) {
    return <div>Ett fel uppstod när datan hämtades</div>;
  }

  // Group appointments by day and time
  const appointmentsByDayAndTime = daysOfWeek.map((day) => {
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
          <div className="w-16 h-14 text-center pt-2 px-2 border-gray-100 text-gray-500 text-sm font-light relative bottom-4">
            {`${hour}:00`}
          </div>
          {/* Time slots for each day */}
          {daysOfWeek.map((day, index) => {
            const formattedDate = format(day, "yyyy-MM-dd");

            // Find the appointment for the current day and hour
            const appointment = appointmentsByDayAndTime[
              index
            ].appointments?.find((appointment: AppointmentType) => {
              const appointmentTime = parse(
                appointment.time,
                "HH:mm",
                new Date()
              ).getHours();
              return appointmentTime === hour;
            });

            return (
              <div
                key={index}
                className="flex-1 border-[0.4px] border-gray-300"
              >
                {/* Render appointment details if available */}
                {appointment && <TheAppointments appointment={appointment} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
