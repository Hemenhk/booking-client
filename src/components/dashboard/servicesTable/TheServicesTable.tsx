"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Service} from "@/types/types";
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { deleteService } from "@/axios/services";
import TheDeleteDialog from "../usersTable/TheDeleteDialog";

type Props = {
  serviceData: Service[];
  userId: string;
};

export default function TheServicesTable({ serviceData, userId }: Props) {
  const queryClient = useQueryClient();

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
        {serviceData?.map((service) => {
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
