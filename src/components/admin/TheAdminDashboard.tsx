"use client";

import { useState, useEffect } from "react"; // Import useState and useEffect
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import TheIncomeCard from "./components/TheIncomeCard";
import TheBookingsCard from "./components/TheBookingsCard";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getBookedAppointmentsForSubuser } from "@/axios/bookAppointment";
import TheDailyAppointments from "./components/TheDailyAppointments";

export default function TheAdminDashboard({
  storeHandle,
}: {
  storeHandle: string;
}) {
  // Default values for year and month
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // State for selected year and month
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Get the previous month and year
  const previousMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
  const previousYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;

  // Fetch data for the current month
  const { storeData, isError, isLoading } = useAdminQuery(
    storeHandle,
    selectedYear,
    selectedMonth
  );

  // Fetch data for the previous month
  const { storeData: previousStoreData, isLoading: isPreviousLoading } =
    useAdminQuery(storeHandle, previousYear, previousMonth);

  if (isLoading || isPreviousLoading) {
    return <div>Laddar butikens data...</div>;
  }

  if (isError) {
    return <div>Ett fel uppstod!</div>;
  }

  if (!storeData) {
    return <div>Finns ingen data för butiken</div>;
  }
  if (!previousStoreData) {
    return <div>Finns ingen data för butiken</div>;
  }
  return (
    <div className="space-y-8 px-2 md:px-0">
      <h2 className="text-2xl justify-center font-semibold">Analyser</h2>
      <div className="flex flex-row justify-center md:justify-start gap-2 md:gap-4">
        <Select
          defaultValue={selectedYear}
          onValueChange={(value) => setSelectedYear(Number(value))}
        >
          <SelectTrigger className="w-full md:w-[120px]">
            <SelectValue placeholder="Välj år" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                (year, idx) => (
                  <SelectItem key={idx} value={year}>
                    {year}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue={selectedMonth}
          onValueChange={(value) => setSelectedMonth(Number(value))}
        >
          <SelectTrigger className="w-full md:w-[120px]">
            <SelectValue placeholder="Välj månad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "Maj",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Okt",
                "Nov",
                "Dec",
              ].map((monthName, idx) => (
                <SelectItem key={idx} value={idx + 1}>
                  {monthName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-center md:flex-row gap-3 w-full">
        <TheIncomeCard
          storeData={storeData}
          previousStoreData={previousStoreData}
        />
        <TheBookingsCard
          storeData={storeData}
          previousStoreData={previousStoreData}
        />
      </div>
      <TheDailyAppointments />
    </div>
  );
}
