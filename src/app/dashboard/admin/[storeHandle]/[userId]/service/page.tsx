"use client";
import TheServicesTable from "@/components/dashboard/servicesTable/TheServicesTable";
import TheCreateServiceForm from "@/components/forms/createServiceForm/TheCreateServiceForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getServicesForSubUser } from "@/axios/services";
import { TriangleAlert } from "lucide-react";
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

  const hasServices = serviceData && serviceData.length > 0;


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
    <>
      {!hasServices && (
        <Card className="overflow-hidden max-w-[600px] border-red-700">
          <CardContent className="flex flex-row items-center gap-3 py-2">
            <TriangleAlert size={18} className="text-red-700" />
            <p className="flex flex-row items-center gap-5 text-sm">
              Lägg till en tjänst för att synas i sökmotorn
            </p>
          </CardContent>
        </Card>
      )}{" "}
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
          {serviceData ? (
            <TheServicesTable
              serviceData={serviceData}
              userId={session?.user.id}
            />
          ) : (
            "Inga tillgängliga tjänster"
          )}
        </CardContent>
      </Card>
    </>
  );
}
