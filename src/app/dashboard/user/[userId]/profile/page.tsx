"use client";
import ThePasswordCard from "@/components/dashboard/profile/ThePasswordCard";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { userId } = useParams<{
    userId: string;
  }>();

  return (
    <div className="flex flex-col gap-5">
      <ThePasswordCard userId={userId} />
    </div>
  );
}
