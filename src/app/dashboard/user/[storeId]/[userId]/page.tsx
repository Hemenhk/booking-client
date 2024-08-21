import TheAppointmentDashboard from "@/components/dashboard/TheAppointmentDashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RiCalendar2Fill, RiMoneyDollarCircleFill } from "react-icons/ri";

import React from "react";

export default function UserPage() {
  return <div className="flex flex-row gap-4 items-center">
  <Card className="w-[400px] rounded-2xl">
    <CardContent className="flex flex-row items-center gap-3 py-6">
      <RiMoneyDollarCircleFill size={50}/>
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">+25,000 kr</h2>
        <p className="text-sm text-gray-400">Inkomst</p>
      </div>
    </CardContent>
  </Card>
  <Card className="w-[400px] rounded-2xl">
    <CardContent className="flex flex-row items-center gap-3 py-6">
      <RiCalendar2Fill size={50}/>
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">+23 st</h2>
        <p className="text-sm text-gray-400">Antal bokningar</p>
      </div>
    </CardContent>
  </Card>
  <Card className="w-[400px] rounded-2xl">
    <CardContent className="flex flex-row items-center gap-3 py-6">
      <RiMoneyDollarCircleFill size={50}/>
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">+25,000 kr</h2>
        <p className="text-sm text-gray-400">Inkomst</p>
      </div>
    </CardContent>
  </Card>
  </div>;
}
