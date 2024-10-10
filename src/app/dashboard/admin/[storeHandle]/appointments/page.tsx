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
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TheSubUserAppointments from "@/components/appointments/TheSubUserAppointments";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useSession } from "next-auth/react";
import TheSubUserAppointmentsMobile from "@/components/appointments/components/TheSubUserAppointmentsMobile";

export default function TheAdminAppointmentPage() {
  const { storeHandle } = useParams<{ storeHandle: string }>();
  const { data: session } = useSession();
  const { isError, isLoading, subUsers, storeData, admin } =
    useAdminQuery(storeHandle);

  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    session?.user?.id || subUsers?.[0]?._id
  );

  console.log("store data:", storeData);
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
    <div className="flex flex-col gap-5 h-full mb-20">
      <div className="flex flex-row justify-between items-center px-2 md:px-0">
        <h2 className="text-lg md:text-2xl font-semibold tracking-tight">
          Anställdas schema:
        </h2>
        <Select value={selectedValue} onValueChange={handleProductSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {/* Include the admin option if admin is available */}
            {admin && (
              <SelectItem key={admin._id} value={admin._id}>
                {admin.name}
              </SelectItem>
            )}
            {/* List sub-users */}
            {subUsers?.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedValue ? (
        <TheSubUserAppointmentsMobile selectedUserId={selectedValue} storeData={storeData}  />
      ) : (
        ""
      )}

      <Card className="hidden md:block">
        <CardContent>
          {selectedValue ? (
              
                <TheSubUserAppointments selectedUserId={selectedValue} storeData={storeData} />
          ) : (
            <p>Välj en anställd för att se schemat.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
