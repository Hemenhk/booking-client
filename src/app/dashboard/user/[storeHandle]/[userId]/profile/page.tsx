"use client";
import TheOpeningHoursForm from "@/components/forms/openingHoursForm/TheOpeningHoursForm";
import TheUpdatePasswordForm from "@/components/forms/updatePassword/TheUpdatePasswordForm";
import TheUpdatePhoneNumber from "@/components/forms/updatePhone/TheUpdatePhoneNumber";
import TheUpdateProfileForm from "@/components/forms/updateProfile/TheUpdateProfileForm";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="flex flex-col gap-5">
      <TheUpdatePhoneNumber />
      <TheUpdateProfileForm userId={userId} />
      <TheUpdatePasswordForm userId={userId} />
    </div>
  );
}
