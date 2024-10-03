"use client";
import ThePasswordCard from "@/components/dashboard/profile/ThePasswordCard";
import ThePhoneCard from "@/components/dashboard/profile/ThePhoneCard";
import TheProfileImageCard from "@/components/dashboard/profile/TheProfileImageCard";

import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();

  const { storeData, isLoading, isError } = useAdminQuery(storeHandle);

  if (isLoading) {
    return <div>Laddar data</div>;
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
      <TheProfileImageCard
        userId={userId}
        // storeData={storeData.store}
      />
      {/* Password Card */}
      <ThePasswordCard userId={userId} />
    </div>
  );
}
