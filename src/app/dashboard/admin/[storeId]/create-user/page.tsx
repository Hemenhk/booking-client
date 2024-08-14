import TheSubUserCreationForm from "@/components/forms/createSubUserForm/TheSubUserCreationForm";

export default function page({ params }: { params: { storeId: string } }) {
  return <TheSubUserCreationForm storeId={params.storeId} />;
}
