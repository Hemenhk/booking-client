"use client";

import { getSingleStoreDetail } from "@/axios/stores";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import TheSubUserAppointments from "@/components/appointments/TheSubUserAppointments";

export default function TheAdminAppointmentPage() {
  const { storeHandle } = useParams<{ storeHandle: string }>();
  const {
    data: subUserData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getSingleStoreDetail(storeHandle),
  });

  const subUsers = subUserData?.sub_users;

  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    subUsers?.[0]?._id
  );

  console.log("selected value: ", selectedValue);

  if (isLoading) {
    return <p>Laddar anställda</p>;
  }

  if (isError) {
    return <p>Ett fel uppstod!</p>;
  }

  const handleProductSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Anställdas schema:</h2>
        <Select value={selectedValue} onValueChange={handleProductSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Välj anställd" />
          </SelectTrigger>
          <SelectContent>
            {subUsers?.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent>
          {selectedValue ? (
            <TheSubUserAppointments selectedUserId={selectedValue} />
          ) : (
            <p>Välj en anställd för att se schemat.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
