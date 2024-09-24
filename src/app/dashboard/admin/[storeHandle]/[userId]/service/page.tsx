"use client";
import TheServicesTable from "@/components/dashboard/servicesTable/TheServicesTable";
import TheCreateServiceForm from "@/components/forms/createServiceForm/TheCreateServiceForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getServicesForSubUser } from "@/axios/services";

export default function AdminCreateServicePage() {
  const { data: session } = useSession();
  const {
    data: serviceData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services", session?.user.id],
    queryFn: () => {
      if (session?.user.id) {
        return getServicesForSubUser(session?.user.id);
      }
      return Promise.reject(new Error("User ID is undefined"));
    },
  });

  if (isLoading) {
    return <div>Laddar data...</div>;
  }

  if (isError) {
    return <div>Ett fel uppstod när vi hämtade tjänsterna.</div>;
  }

  if (!serviceData || serviceData.length === 0) {
    return <div>Inga tjänster tillgängliga.</div>;
  }

  if (!session?.user.id) {
    return <div>No user ID</div>
  }

  return (
    <Card className="max-w-[1200px]">
      <CardHeader className="flex flex-row justify-between">
        <h3 className="text-lg font-medium">
          Alla tjänster:{" "}
          <span className="text-base font-normal pl-2">
           {serviceData.length}
          </span>
        </h3>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="tracking-wide rounded-[10px]">
                <span className="pr-2 text-lg">+</span>Lägg till
              </Button>
            </DialogTrigger>
            <TheCreateServiceForm />
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <TheServicesTable serviceData={serviceData} userId={session?.user.id} />
      </CardContent>
    </Card>
  );
}
