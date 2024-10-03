"use client";
import TheBookAppointmentForm from "@/components/forms/bookAppoitmentForm/TheBookAppointmentForm";

export default function BookUserPage({
  params,
}: {
  params: { storeHandle: string; userId: string };
}) {
  return (
    <TheBookAppointmentForm
      storeHandle={params.storeHandle}
      userId={params.userId}
    />
  );
}
