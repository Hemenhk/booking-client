import { StoreData } from "@/axios/stores";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  storeData: StoreData;
  previousStoreData: StoreData;
};

export default function TheBookingsCard({
  storeData,
  previousStoreData,
}: Props) {

  const [percentageDifference, setPercentageDifference] = useState<
  number | null
>(null);

    useEffect(() => {
        if (storeData && previousStoreData) {
          const currentMonthBookings = storeData.storeAppointments.length;
          const previousMonthBookings = previousStoreData.storeAppointments.length;
    
          if (previousMonthBookings > 0) {
            const percentageDiff =
              ((currentMonthBookings - previousMonthBookings) /
                previousMonthBookings) *
              100;
            setPercentageDifference(percentageDiff);
          } else {
            setPercentageDifference(null);
          }
        }
      }, [storeData, previousStoreData]);
      
  return (
    <Card className="w-80 max-w-[350px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Totala bokningar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {storeData.storeAppointments.length} st
        </div>
        {/* Show percentage difference if available */}
        {percentageDifference !== null ? (
          <div
            className={`text-sm font-medium mt-2 flex items-center ${
              percentageDifference > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {percentageDifference > 0 ? (
              <ArrowUpRight size={18} />
            ) : (
              <ArrowDownRight size={18} />
            )}
            {percentageDifference.toFixed(2)}% från förra månaden
          </div>
        ) : (
          <div className="text-sm font-medium mt-2 text-gray-500">
            Ingen förändring från förra månaden
          </div>
        )}
      </CardContent>
    </Card>
  );
}
