"use client";
import ThePasswordCard from "@/components/dashboard/profile/ThePasswordCard";
import ThePhoneCard from "@/components/dashboard/profile/ThePhoneCard";
import TheProfileImageCard from "@/components/dashboard/profile/TheProfileImageCard";

import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useParams } from "next/navigation";

export default function AdminProfilePage() {
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

  return (
    <div className="flex flex-col gap-5">
      <ThePhoneCard storeData={storeData} />
      {/* Profile image card */}
      <TheProfileImageCard userId={userId} storeData={storeData} />
      {/* Password Card */}
      <ThePasswordCard userId={userId} />
    </div>
  );
}
