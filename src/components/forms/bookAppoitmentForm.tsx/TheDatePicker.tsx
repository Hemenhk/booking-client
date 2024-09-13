"use client";

import { getAvailableDate } from "@/axios/availableDate";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DatePickerProps = {
  setStep: (value: SetStateAction<number>) => void;
  form: UseFormReturn<
    {
      name: string;
      last_name: string;
      email: string;
      phone_number: string;
      service: string;
      date: string;
      time: string;
      status: string;
    },
    any,
    undefined
  >;
};

export default function TheDatePicker({ form, setStep }: DatePickerProps) {
  // Set selectedDate to the current date by default
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Start of the current week (Monday)
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  // Fetch available dates data
  const { data: dateData, isLoading: isDateLoading } = useQuery({
    queryKey: ["available-data"],
    queryFn: () => getAvailableDate(format(weekStart, "yyyy-MM-dd")),
    enabled: !!weekStart,
  });

  // Generate days for the week
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index)
  );

  // Handle user click on an appointment
  const handleAppointmentClick = (day: Date, time: string) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    setSelectedDate(day);
    setSelectedTime(time);
    setStep((prevStep) => prevStep + 1);
    form.setValue("date", formattedDate);
    form.setValue("time", time);
  };
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <Card className="shadow-md min-w-[700px]">
            <CardHeader className="flex gap-10 justify-center mx-auto text-center border-b w-[90%]">
              {/* Display dynamic month and year */}
              <h1 className="text-2xl font-medium">
                {format(selectedDate, "MMMM yyyy")}
              </h1>
              <div className="flex flex-wrap gap-4 mb-6">
                {/* Render date cards */}
                {daysOfWeek.map((day) => (
                  <Card
                    key={day.toString()}
                    className={`cursor-pointer h-20 w-16 p-4 rounded-lg border ${
                      isSameDay(day, selectedDate)
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800 border-gray-300"
                    } shadow-md hover:shadow-lg transition-all duration-200 ease-out`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <h3 className="font-semibold text-center">
                      {format(day, "EEE")}
                    </h3>
                    <p className="text-center">{format(day, "d")}</p>
                  </Card>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {/* Render time slots for the selected date */}
              {selectedDate && (
                <ul className="grid grid-cols-6 gap-3 pt-8 px-10">
                  {dateData?.availableTimesByDay[
                    format(selectedDate, "yyyy-MM-dd")
                  ]?.map((time: string) => (
                    <li
                      key={time}
                      className={`cursor-pointer px-4 py-2 text-center rounded-lg border ${
                        selectedTime === time
                          ? "bg-gray-800 text-white"
                          : "border-gray-200 text-gray-800"
                      } hover:bg-gray-800 hover:text-white transition duration-300 ease-out`}
                      onClick={() => handleAppointmentClick(selectedDate, time)}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              )}

              <div className="h-28 w-[90%] mx-auto px-10 mt-6 bg-zinc-200 rounded-lg">
                <div>Klippning</div>
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-center border-t pt-6">
              <Button className="w-[90%] font-light">Gå vidare</Button>
            </CardFooter>
          </Card>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
