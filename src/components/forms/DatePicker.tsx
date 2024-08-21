import { getAvailableDate } from "@/axios/availableDate";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

import { FormField, FormItem, FormMessage } from "../ui/form";
import { UseFormReturn } from "react-hook-form";

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
      status: "active" | "cancelled";
    },
    any,
    undefined
  >;
};

export default function DatePicker({ form, setStep }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  const { data: dateData, isLoading: isDateLoading } = useQuery({
    queryKey: ["available-data"],
    queryFn: () => getAvailableDate(format(weekStart, "yyyy-MM-dd")),
    enabled: !!weekStart,
  });

  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index)
  );

  console.log("date", dateData);

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
      <FormItem className="flex flex-col">
        <div className="flex gap-5">
          {daysOfWeek.map((day) => (
            <div
              key={day.toString()}
              className={`text-sm w-40 ${
                isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            >
              <h3 className="font-medium tracking-tight">
                {format(day, "EEEE, MMM d")}
              </h3>

              <ul className="flex flex-col h-full gap-2 py-5">
                {dateData?.availableTimesByDay[format(day, "yyyy-MM-dd")]?.map(
                  (time: string) => (
                    <li
                      key={time}
                      className={`bg-teal-600 border-green-500 transition ease-out duration-300 hover:bg-teal-800 text-white border max-w-14 h-10 flex justify-center items-center rounded-md cursor-pointer ${
                        selectedDate &&
                        isSameDay(day, selectedDate) &&
                        selectedTime === time
                          ? "bg-green-600"
                          : "bg-green-400"
                      }`}
                      onClick={() => handleAppointmentClick(day, time)}
                    >
                      {time}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
  );
}
