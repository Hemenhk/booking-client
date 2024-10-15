"use client";
import { getSingleSubuser } from "@/axios/stores";
import ThePasswordCard from "@/components/dashboard/profile/ThePasswordCard";
import ThePhoneCard from "@/components/dashboard/profile/ThePhoneCard";
import TheProfileImageCard from "@/components/dashboard/profile/TheProfileImageCard";
import { TheSkeletonCard } from "@/components/skeletons/TheSkeletonCard";

import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();

  const { storeData, isLoading, isError } = useAdminQuery(storeHandle);
  const { data: subuserData } = useQuery({
    queryKey: ["sub-user"],
    queryFn: () => getSingleSubuser(session?.user.id, storeHandle),
  });
  

  console.log("subuser", subuserData)

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full p-4 pt-10">
        <TheSkeletonCard />
      </div>
    );
  }

  if (!storeData) {
    return <div>Finns ingen butik information</div>;
  }

  if (!session?.user) {
    return <div>Ingen användare hittades</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      {session.user.role === "store_admin" ? (
        <ThePhoneCard storeData={storeData.store} />
      ) : (
        ""
      )}

      {/* Profile image card */}
      <TheProfileImageCard userId={userId} subuserProfileImage={subuserData.data.profileImage} />
      {/* Password Card */}
      <ThePasswordCard userId={userId} />
    </div>
  );
}
