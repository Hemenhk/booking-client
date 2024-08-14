"use client";

import { getSingleStore } from "@/axios/stores";
import TheUsersTable from "@/components/dashboard/usersTable/TheUsersTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function StoreUserPage() {
  const { storeId } = useParams<{ storeId: string }>();

  // console.log("params", params)
  const {
    data: storeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-store"],
    queryFn: () => getSingleStore(storeId),
  });

  console.log("data", storeData);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <h3 className="text-lg font-medium">
          Alla användare:{" "}
          <span className="text-base font-normal pl-2">
            {storeData?.sub_users.length} av 5
          </span>
        </h3>
        <div>
          <Button className="tracking-wide rounded-[10px]"><span className="pr-2 text-lg">+</span>Lägg till</Button>
        </div>
      </CardHeader>
      <CardContent>
        <TheUsersTable storeData={storeData} />
      </CardContent>
    </Card>
  );
}
