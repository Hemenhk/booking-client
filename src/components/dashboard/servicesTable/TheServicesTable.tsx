"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Store } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import {
  deleteService,
  getServicesForSubUser,
} from "@/axios/services";
import TheDeleteDialog from "../usersTable/TheDeleteDialog";

export default function TheServicesTable({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const {
    data: serviceData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services", userId],
    queryFn: () => getServicesForSubUser(userId),
  });

  console.log("serivice data", serviceData);

  const { mutateAsync: deleteServiceMutation } = useMutation({
    mutationFn: ({
      userId,
      serviceId,
    }: {
      userId: string;
      serviceId: string;
    }) => deleteService(userId, serviceId),

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["single-store"] });
      queryClient.refetchQueries({ queryKey: ["services"] });
    },
  });

  if (isLoading) {
    return <div>Laddar data...</div>;
  }

  if (isError) {
    return <div>Ett fel uppstod när vi hämtade tjänsterna.</div>;
  }

  // Handle case when `serviceData` might be empty or undefined
  if (!serviceData || serviceData.length === 0) {
    return <div>Inga tjänster tillgängliga.</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Namn</TableHead>
          <TableHead className="">Pris</TableHead>
          <TableHead className="text-right">Tid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serviceData.map((service) => {
          return (
            <TableRow key={service._id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell className="">{service.price}kr</TableCell>
              <TableCell className="text-right">
                {service.duration} minuter
              </TableCell>
              <TableCell className="w-24">
                <TheDeleteDialog
                  deleteMutation={deleteServiceMutation}
                  mutationArgs={[{ userId, serviceId: service._id }]} // Pass userId and serviceId to delete the service
                  title="Ta bort tjänsten?"
                  description="Den här handlingen kommer permanent ta bort tjänsten."
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
