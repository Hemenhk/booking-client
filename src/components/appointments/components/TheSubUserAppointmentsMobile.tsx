"use client";
import {
  format,
  parse,
  addMinutes,
  isAfter,
  isBefore,
  getWeek,
  getHours,
  getMinutes,
  addDays,
  startOfWeek,
} from "date-fns";
import { sv } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBookedAppointmentsForSubuser } from "@/axios/bookAppointment";
import TheAppointments from "../TheAppointments";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoreData } from "@/axios/stores";
import { Appointment } from "@/types/types";
import { MoonLoader } from "react-spinners";


type Props = {
  selectedUserId: string;
  storeData: StoreData;
};

export default function TheSubUserAppointmentsMobile({
  selectedUserId,
  storeData,
}: Props) {
  const [weekStart, setWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  ); // Start with the current week
  // State to manage the current date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const currentWeek = getWeek(weekStart, { locale: sv });

  // Calculate the start of the current week
  // const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday is the start of the week

  // Get an array of 7 days starting from the start of the week
  const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
    addDays(weekStart, index)
  );

  const openingHours = storeData?.store?.opening_hours[0];

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

  // Hours range (9 AM to 6 PM)
  // const hours = Array.from({ length: 10 }).map((_, index) => index + 9);

  const {
    data: bookedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["sub-appointments-mobile", selectedUserId, currentDate],
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

  // Format current date to match appointment date format
  const formattedToday = format(currentDate, "yyyy-MM-dd");

  // Filter appointments for the selected day
  const appointmentsForToday = bookedData?.filter(
    (appointment: Appointment) => {
      const appointmentDate = format(
        parse(appointment.date, "dd/MM/yyyy", new Date()),
        "yyyy-MM-dd"
      );
      return appointmentDate === formattedToday;
    }
  );

  // Function to go to the next week
  const goToNextWeek = () => {
    setWeekStart((prevWeek) => addDays(prevWeek, 7)); // Move to the next week
  };

  // Function to go to the previous week
  const goToPreviousWeek = () => {
    setWeekStart((prevWeek) => addDays(prevWeek, -7)); // Move to the previous week
  };

  return (
    <div className="py-2 mx-4 space-y-4 md:hidden">
      <div className="flex justify-center gap-5  items-center mb-8">
        {/* Button to go to the previous week */}
        <Button
          onClick={goToPreviousWeek}
          className="size-6 bg-gray-50 border text-black p-0 hover:bg-gray-50"
        >
          <ArrowLeft size={15} />
        </Button>

        <h1 className="text-xl font-medium capitalize">
          {`Vecka ${currentWeek}, ${format(weekStart, "MMMM yyyy", {
            locale: sv,
          })}`}
        </h1>

        {/* Button to go to the next week */}
        <Button
          onClick={goToNextWeek}
          className="size-6 bg-gray-50 border text-black p-0 hover:bg-gray-50"
        >
          <ArrowRight size={15} />
        </Button>
      </div>
      {/* Day Picker */}
      <div className="flex justify-center gap-2 border-b pb-2 w-full">
        {daysOfWeek.map((day, index) => (
          <button
            key={index}
            onClick={() => setCurrentDate(day)}
            className={`px-1.5 py-2 flex flex-col items-center gap-1.5 font-medium `}
          >
            <span className="text-gray-400 font-light uppercase text-xs">
              {format(day, "EEE", { locale: sv })}
            </span>{" "}
            {/* Example: Mon */}
            <span
              className={`text-gray-700 ${
                format(day, "yyyy-MM-dd", { locale: sv }) === formattedToday
                  ? "size-8 flex justify-center items-center bg-black text-white rounded-full"
                  : "flex justify-center items-center size-8"
              }`}
            >
              {format(day, "d")}
            </span>{" "}
            {/* Example: 30 */}
          </button>
        ))}
      </div>

      {/* Grid Layout for Time Slots */}
      <div className="grid grid-cols-[50px_1fr] px-2">
        {/* Render time slots */}
        {hours.map((hour) => {
          // Filter appointments for the current hour
          const appointmentsForHour = appointmentsForToday?.filter(
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
              const slotStartTime = currentDate.setHours(hour, 0, 0, 0);
              const slotEndTime = currentDate.setHours(hour + 1, 0, 0, 0);
              return (
                (isAfter(appointmentEndTime, slotStartTime) &&
                  isBefore(appointmentStartTime, slotEndTime)) ||
                (getHours(appointmentStartTime) === hour &&
                  getMinutes(appointmentStartTime) === 0)
              );
            }
          );

          return (
            <>
              {/* Time label in the first column */}
              <div key={`time-${hour}`} className="text-xs -mt-2 text-gray-400">
                {`${hour}:00`}
              </div>

              {/* Appointments or Empty slots in the second column */}
              <div
                key={`slot-${hour}`}
                className="border-t border-b border-gray-200 h-28"
              >
                {appointmentsForHour && appointmentsForHour.length > 0 ? (
                  appointmentsForHour.map((appointment: Appointment) => (
                    <div key={appointment._id} className="my-2">
                      <TheAppointments appointment={appointment} />
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400 mt-2">
                    Inga bokningar
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
