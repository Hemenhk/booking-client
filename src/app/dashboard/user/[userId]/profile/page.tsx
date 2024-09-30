"use client";
import ThePasswordCard from "@/components/dashboard/profile/ThePasswordCard";
import ThePhoneCard from "@/components/dashboard/profile/ThePhoneCard";
import TheProfileImageCard from "@/components/dashboard/profile/TheProfileImageCard";

import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { storeHandle, userId } = useParams<{
    storeHandle: string;
    userId: string;
  }>();

 

  return (
    <div className="flex flex-col gap-5">
      <ThePasswordCard userId={userId} />
    </div>
  );
}
