"use client";

import { useState } from "react"; // Import useState and useEffect
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAdminQuery } from "@/hooks/useAdminQuery";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TheIncomeCard from "./components/TheIncomeCard";
import TheBookingsCard from "./components/TheBookingsCard";

import TheDailyAppointments from "./components/TheDailyAppointments";
import { TriangleAlert } from "lucide-react";
import { TheSkeletonCard } from "../skeletons/TheSkeletonCard";
import TheHasNotAccess from "../access/TheHasNotAccess";
import { MoonLoader } from "react-spinners";

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

  const hasPhonenumber = storeData && storeData?.store?.phone_number;

  // Fetch data for the previous month
  const { storeData: previousStoreData, isLoading: isPreviousLoading } =
    useAdminQuery(storeHandle, previousYear, previousMonth);

  if (storeData?.store?.hasAccess === false) {
    return <TheHasNotAccess />;
  }

  if (isLoading || isPreviousLoading) {
    return (
      <div className="flex h-[80vh] w-full justify-center items-center">
        <MoonLoader size={30} />
      </div>
    );
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
      {!hasPhonenumber && (
        <Card className="overflow-hidden max-w-[600px] border-red-700">
          <CardContent className="flex flex-row items-center gap-3 py-2">
            <TriangleAlert size={18} className="text-red-700" />
            <p className="flex flex-row items-center gap-5 text-sm">
              Lägg till ett telefonnummer för att synas i sökmotorn
            </p>
          </CardContent>
        </Card>
      )}
      <h2 className="text-2xl justify-center font-semibold">Analyser</h2>
      <div className="flex flex-row justify-center md:justify-start gap-2 md:gap-4">
        <Select
          defaultValue={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(Number(value))}
        >
          <SelectTrigger className="w-full md:w-[120px]">
            <SelectValue placeholder="Välj år" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                (year, idx) => (
                  <SelectItem key={idx} value={year.toString()}>
                    {year}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue={selectedMonth.toString()}
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
                <SelectItem key={idx} value={(idx + 1).toString()}>
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
