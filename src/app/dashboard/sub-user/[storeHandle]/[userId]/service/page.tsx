"use client";
import TheServicesTable from "@/components/dashboard/servicesTable/TheServicesTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TheCreateServiceForm from "@/components/forms/createServiceForm/TheCreateServiceForm";
import { useQuery } from "@tanstack/react-query";
import { getServicesForSubUser } from "@/axios/services";
import { TheSkeletonCard } from "@/components/skeletons/TheSkeletonCard";

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

  console.log("services", serviceData);

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full p-4 pt-10">
        <TheSkeletonCard />
      </div>
    );
  }

  if (isError) {
    return <div>Ett fel uppstod när vi hämtade tjänsterna.</div>;
  }

  if (!session?.user.id) {
    return <div>No user ID</div>;
  }

  return (
    <Card className="max-w-[1200px]">
      <CardHeader className="flex flex-row justify-between">
        <h3 className="text-lg font-medium">
          Alla tjänster:{" "}
          <span className="text-base font-normal pl-2">
            {serviceData?.length}
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
