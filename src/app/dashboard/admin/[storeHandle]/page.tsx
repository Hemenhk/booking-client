import TheAdminDashboard from "@/components/admin/TheAdminDashboard";

export default function AdminPage({
  params,
}: {
  params: { storeHandle: string };
}) {
  const { storeHandle } = params;

  return <TheAdminDashboard storeHandle={storeHandle} />;
}
