"use client";
import TheUpdatePasswordForm from "@/components/forms/updatePassword/TheUpdatePasswordForm";
import TheUpdateProfileForm from "@/components/forms/updateProfile/TheUpdateProfileForm";
import { useParams } from "next/navigation";


export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  

  return (
    <div className="flex flex-col gap-5">
      <TheUpdateProfileForm userId={userId} />
      <TheUpdatePasswordForm userId={userId} />
    </div>
  );
}
