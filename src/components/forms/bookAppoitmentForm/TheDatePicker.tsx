"use client";

import { getAvailableDate } from "@/axios/availableDate";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  parse,
  addMinutes,
  isBefore,
} from "date-fns";

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
import { Service } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const savedService = localStorage.getItem("service");

  if (!savedService) {
    return <p>No service saved in local storage.</p>;
  }

  const service: Service = JSON.parse(savedService);

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

  // Calculate the end time using selectedTime and service.duration
  const calculateEndTime = (startTime: string, duration: number) => {
    const parsedStartTime = parse(startTime, "HH:mm", new Date());
    const endTime = addMinutes(parsedStartTime, duration);
    return format(endTime, "HH:mm");
  };

  // Handle user click on an appointment
  const handleAppointmentClick = (day: Date, time: string) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    setSelectedDate(day);
    setSelectedTime(time);
    form.setValue("date", formattedDate);
    form.setValue("time", time);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const isTimePassed = (day: Date, time: string) => {
    const now = new Date();
    const selectedDateTime = parse(time, "HH:mm", day);
    return isBefore(selectedDateTime, now);
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
                  ]
                    ?.filter((time: string) => {
                      // Only show times that have not passed
                      return !isTimePassed(selectedDate, time);
                    })
                    .map((time: string) => (
                      <li
                        key={time}
                        className={`cursor-pointer px-4 py-2 text-center rounded-lg border ${
                          selectedTime === time
                            ? "bg-gray-800 text-white"
                            : "border-gray-200 text-gray-800"
                        } hover:bg-gray-800 hover:text-white transition duration-300 ease-out`}
                        onClick={() =>
                          handleAppointmentClick(selectedDate, time)
                        }
                      >
                        {time}
                      </li>
                    ))}
                </ul>
              )}

              <div className="h-full w-[90%] mx-auto px-10 pt-5 mt-6 bg-zinc-100 rounded-lg">
                <div className="border-b pb-3 w-full flex justify-between">
                  <div className="flex flex-row gap-2">
                    <h3 className="font-medium">Tjänst:</h3>
                    <p className="text-gray-600">{service.name}</p>
                  </div>
                  <div className="flex flex-col text-right">
                    <h3 className="font-medium">{service.price}kr</h3>
                    <p className="text-gray-500 text-sm font-light">
                      {selectedTime
                        ? `${selectedTime} - ${calculateEndTime(
                            selectedTime,
                            service.duration
                          )}`
                        : "Välj en tid"}{" "}
                    </p>
                  </div>
                </div>
                <div className="py-4">
                  <div className="flex flex-row items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        className="object-cover"
                        src={service?.createdBy?.profileImage}
                      />
                      <AvatarFallback className="text-3xl">None</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col text-left">
                      <h3 className="text-gray-600 font-light">
                        {service?.createdBy?.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-center border-t pt-6">
              <Button className="w-[90%] font-light" onClick={handleNextStep}>
                Gå vidare
              </Button>
            </CardFooter>
          </Card>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
