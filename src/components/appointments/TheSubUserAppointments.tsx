"use client";
import {
  format,
  addDays,
  startOfWeek,
  parse,
  getWeek,
  getHours,
  getMinutes,
  addMinutes,
  isBefore,
  isAfter,
} from "date-fns";
import { sv } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"; // Import useState
import { getBookedAppointmentsForSubuser } from "@/axios/bookAppointment";
import TheAppointments from "./TheAppointments";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import { StoreData } from "@/axios/stores";
import TheTimeLine from "./components/TheTimeLine";
import { MoonLoader } from "react-spinners";
import { Appointment } from "@/types/types";

type Props = {
  selectedUserId: string;
  storeData?: StoreData;
};

export default function TheSubUserAppointments({
  selectedUserId,
  storeData,
}: Props) {
  // Manage the state for the currently displayed week
  const [weekStart, setWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  ); // Start with the current week

  // Generate days of the current week
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(weekStart, index)
  );

  const currentWeek = getWeek(weekStart, { locale: sv });

  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["sub-appointments", selectedUserId, weekStart], // Add weekStart to query key
    queryFn: () => getBookedAppointmentsForSubuser(selectedUserId),
  });

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full justify-center items-center">
        <MoonLoader size={30} />
      </div>
    );
  }

  if (isError) {
    return <div>Ett fel uppstod när datan hämtades</div>;
  }

  const openingHours = storeData?.store?.opening_hours[0];

  if (!openingHours) {
    return (
      <div className="h-[80vh] w-full flex flex-col justify-center items-center">
        {/* Icon */}
        <TriangleAlert size={80} className="text-red-500 mb-6" />

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Schemat är inte tillgängligt
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg text-center mb-8 w-3/4">
          Din butik har inte några öppettider valda och ditt schema kommer
          därmed inte visas.
        </p>
      </div>
    );
  }

  const openingTimes = Object.values(openingHours)
    .filter((day) => !day.closed)
    .map((day) => parse(day.open, "HH:mm", new Date()));

  const closingTimes = Object.values(openingHours)
    .filter((day) => !day.closed)
    .map((day) => parse(day.close, "HH:mm", new Date()));

  const earliestOpen = Math.min(...openingTimes.map((time) => getHours(time)));
  const latestClose = Math.max(...closingTimes.map((time) => getHours(time)));

  // Generate consistent hours for the week (from earliest open to latest close)
  const hours = Array.from({ length: latestClose - earliestOpen }).map(
    (_, index) => earliestOpen + index
  );

  // Get today's date
  const today = format(new Date(), "yyyy-MM-dd");

  // Group appointments by day
  const appointmentsByDay = daysOfWeek.map((day) => {
    const formattedDate = format(day, "yyyy-MM-dd");

    return {
      date: formattedDate,
      appointments: bookedData?.filter((appointment: Appointment) => {
        const appointmentDate = format(
          parse(appointment.date, "dd/MM/yyyy", new Date()),
          "yyyy-MM-dd"
        );
        return appointmentDate === formattedDate;
      }),
    };
  });

  // Function to go to the next week
  const goToNextWeek = () => {
    setWeekStart((prevWeek) => addDays(prevWeek, 7)); // Move to the next week
  };

  // Function to go to the previous week
  const goToPreviousWeek = () => {
    setWeekStart((prevWeek) => addDays(prevWeek, -7)); // Move to the previous week
  };

  // Get the current time
  const now = new Date();
  const currentHour = getHours(now);
  const currentMinute = getMinutes(now);

  return (
    <div className="flex flex-col h-full m-8 relative">
      <div className="flex gap-6 justify-center items-center mb-8">
        {/* Button to go to the previous week */}
        <Button
          onClick={goToPreviousWeek}
          className="size-8 bg-gray-50 border text-black p-0 hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
        </Button>

        <h1 className="text-2xl font-semibold">
          {`Vecka ${currentWeek}, ${format(weekStart, "MMMM yyyy", {
            locale: sv,
          })}`}
        </h1>

        {/* Button to go to the next week */}
        <Button
          onClick={goToNextWeek}
          className="size-8 bg-gray-50 border text-black p-0 hover:bg-gray-50"
        >
          <ArrowRight size={18} />
        </Button>
      </div>

      <div className="flex">
        {/* First cell is empty */}
        <div className="w-16"></div>
        {/* Render day headers */}
        {daysOfWeek.map((day, index) => {
          const formattedDay = format(day, "yyyy-MM-dd");
          const isToday = formattedDay === today;

          return (
            <div
              key={index}
              className={`flex-1 text-center p-3 m-2 mb-3 capitalize border-gray-100 ${
                isToday ? "bg-gray-800 font-light text-white rounded-full" : ""
              }`} // Highlight today's day
            >
              {format(day, "EEE, d MMM ", { locale: sv })}
            </div>
          );
        })}
      </div>

      {/* Render time slots */}
      {hours.map((hour) => (
        <div key={hour} className="flex relative">
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
            ].appointments?.filter((appointment: Appointment) => {
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
                className="flex-1 border-[0.4px] border-gray-300 relative"
              >
                {/* Render multiple appointments if available */}
                {appointments?.map((appointment: Appointment) => {
                  // Calculate top offset and height based on the appointment time and duration
                  const appointmentStartTime = parse(
                    `${appointment.date} ${appointment.time}`,
                    "dd/MM/yyyy HH:mm",
                    new Date()
                  );
                  const startMinutes = getMinutes(appointmentStartTime);
                  const appointmentDuration = appointment.service.duration;

                  const topOffsetPercentage = (startMinutes / 60) * 100;
                  const heightPercentage = (appointmentDuration / 60) * 100;

                  return (
                    <div
                      key={appointment._id}
                      className="absolute left-0 right-0 mb-1"
                      style={{
                        top: `${topOffsetPercentage}%`,
                        height: `${heightPercentage}%`,
                      }}
                    >
                      <TheAppointments appointment={appointment} />
                    </div>
                  );
                })}
                {/* Timeline indicator */}
                <TheTimeLine
                  currentHour={currentHour}
                  currentMinute={currentMinute}
                  dayIndex={dayIndex}
                  hour={hour}
                />
              </div>
            );
          })}
        </div>
      ))}

      {/* Add the current time box next to the timeline */}
      <div className="flex">
        <div className="w-16 h-20 text-center pt-2 px-2 border-gray-100 text-gray-500 text-sm font-light relative bottom-4">
          {`${latestClose}:00`} {/* Display the closing time */}
        </div>
      </div>
    </div>
  );
}
