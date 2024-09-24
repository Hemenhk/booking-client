"use client";
import TheServicesTable from "@/components/dashboard/servicesTable/TheServicesTable";
import TheCreateServiceForm from "@/components/forms/createServiceForm/TheCreateServiceForm";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function AdminCreateServicePage() {
  const { data: session } = useSession();

  const router = useRouter();

  if (!session?.user.id) {
    return <p>No user</p>;
  }

  return (
    <Card className="max-w-[1200px]">
      <CardHeader className="flex flex-row justify-between">
        <h3 className="text-lg font-medium">
          Alla tjänster:{" "}
          <span className="text-base font-normal pl-2">
            {/* {subUsers.length} */}
            10
          </span>
        </h3>
        <div>
          <Button
            className="tracking-wide rounded-[10px]"
            onClick={() =>
              router.push(
                `/dashboard/admin/${session.user.store.handle}/${session?.user.id}/service/create-service`
              )
            }
          >
            <span className="pr-2 text-lg">+</span>Lägg till
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TheServicesTable userId={session?.user.id} />
      </CardContent>
    </Card>
  );
}
