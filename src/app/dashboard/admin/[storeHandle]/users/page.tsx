"use client";

import { getSingleStore } from "@/axios/stores";
import TheUsersTable from "@/components/dashboard/usersTable/TheUsersTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export default function StoreUserPage() {
  const { storeHandle } = useParams<{ storeHandle: string }>();
  const router = useRouter();

  const { storeData, subUsers } = useAdminQuery(storeHandle);

  const handleRedirect = () => {
    router.push(`/dashboard/admin/${storeHandle}/create-user`);
  };

  return (
    <Card className="max-w-[1200px]">
      <CardHeader className="flex flex-row justify-between">
        <h3 className="text-lg font-medium">
          Alla användare:{" "}
          <span className="text-base font-normal pl-2">
            {subUsers?.length} av 5
          </span>
        </h3>
        <div>
          <Button
            className="tracking-wide rounded-[10px]"
            onClick={handleRedirect}
          >
            <span className="pr-2 text-lg">+</span>Lägg till
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TheUsersTable storeHandle={storeHandle} />
      </CardContent>
    </Card>
  );
}
