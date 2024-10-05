"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Service } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "@/axios/services";
import TheDeleteDialog from "../usersTable/TheDeleteDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TheUpdateServiceForm from "@/components/forms/updateServiceForm/TheUpdateServiceForm";

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
          <TableHead className=" md:w-[100px]">Namn</TableHead>
          <TableHead>Pris</TableHead>
          <TableHead>Tid</TableHead>
          <TableHead className="text-right">Bakgrundsfärg</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {serviceData?.map((service) => {
          return (
            <TableRow key={service._id}>
              <Dialog>
                <DialogTrigger asChild>
                  <TableCell className="font-medium hover:underline cursor-pointer">
                    {service.name}
                  </TableCell>
                </DialogTrigger>
                <TheUpdateServiceForm serviceId={service._id} />
              </Dialog>

              <TableCell>{service.price}kr</TableCell>
              <TableCell>{service.duration} minuter</TableCell>
              <TableCell className="flex justify-end">
                <div
                  className={`size-8 rounded-md ${service?.bgColor}`}
                />
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
