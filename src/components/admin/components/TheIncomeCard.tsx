import { StoreData } from "@/axios/stores";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  storeData: StoreData;
  previousStoreData: StoreData;
};

export default function TheIncomeCard({ storeData, previousStoreData }: Props) {
  const [incomePercentageDifference, setIncomePercentageDifference] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (storeData && previousStoreData) {
      const currentMonthIncome = storeData.monthlyTotalIncome;
      const previousMonthIncome = previousStoreData.monthlyTotalIncome;

      if (previousMonthIncome > 0) {
        const incomePercentageDiff =
          ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) *
          100;
        setIncomePercentageDifference(incomePercentageDiff);
      } else {
        setIncomePercentageDifference(null);
      }
    }
  }, [storeData, previousStoreData]);
  return (
    <>
      <Card className="w-80 max-w-[350px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total inkomst inkl. moms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {storeData.monthlyTotalIncome} kr
          </div>
          {/* Show income percentage difference if available */}
          {incomePercentageDifference !== null ? (
            <div
              className={`text-sm font-medium mt-2 flex items-center ${
                incomePercentageDifference > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {incomePercentageDifference > 0 ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
              {incomePercentageDifference.toFixed(2)}% från förra månaden
            </div>
          ) : (
            <div className="text-sm font-medium mt-2 text-gray-500">
              Ingen förändring från förra månaden
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="w-80 max-w-[350px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total inkomst exkl. moms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(storeData.monthlyTotalIncome * 0.8).toFixed(0)} kr
          </div>
          {/* Show income percentage difference if available */}
          {incomePercentageDifference !== null ? (
            <div
              className={`text-sm font-medium mt-2 flex items-center ${
                incomePercentageDifference > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {incomePercentageDifference > 0 ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
              {incomePercentageDifference.toFixed(2)}% från förra månaden
            </div>
          ) : (
            <div className="text-sm font-medium mt-2 text-gray-500">
              Ingen förändring från förra månaden
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
