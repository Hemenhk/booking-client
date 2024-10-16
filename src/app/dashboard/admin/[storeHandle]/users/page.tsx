"use client";

import TheUsersTable from "@/components/dashboard/usersTable/TheUsersTable";
import { TheSkeletonCard } from "@/components/skeletons/TheSkeletonCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useParams, useRouter } from "next/navigation";

export default function StoreUserPage() {
  const { storeHandle } = useParams<{ storeHandle: string }>();
  const router = useRouter();

  const { subUsers, isLoading, isError } = useAdminQuery(storeHandle);

  const handleRedirect = () => {
    router.push(`/dashboard/admin/${storeHandle}/create-user`);
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full p-4 pt-10">
        <TheSkeletonCard />
      </div>
    );
  }

  return (
    <Card className="mx-2 bg-transparent md:bg-white shadow-none md:shadow-sm border-none md:border md:mx-0 max-w-[800px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-base md:text-lg font-medium">
          Alla användare:{" "}
          <span className="text-base font-normal pl-2">
            {subUsers?.length} av 5
          </span>
        </h3>
        <Button
          className="md:hidden flex justify-center items-center rounded-full size-10 "
          onClick={handleRedirect}
        >
          <span className="text-2xl font-light">+</span>
        </Button>
        <Button
          className="hidden md:flex tracking-wide rounded-[10px]"
          onClick={handleRedirect}
        >
          <span className="pr-2 text-lg">+</span>Lägg till
        </Button>
      </CardHeader>
      <CardContent>
        <TheUsersTable storeHandle={storeHandle} />
      </CardContent>
    </Card>
  );
}
