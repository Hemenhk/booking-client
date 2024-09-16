import TheBookAppointmentForm from "@/components/forms/bookAppoitmentForm/TheBookAppointmentForm";

export default function BookUserPage({
  params,
}: {
  params: { userId: string };
}) {

  return (
    <TheBookAppointmentForm userId={params.userId} />
  )
}