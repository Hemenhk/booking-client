"use client";

import { Service } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "@/axios/services";
import TheDeleteDialog from "../usersTable/TheDeleteDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TheUpdateServiceForm from "@/components/forms/updateServiceForm/TheUpdateServiceForm";
import { Button } from "@/components/ui/button";

type Props = {
  serviceData: Service[];
  userId: string;
};

export default function TheServicesTableMobile({ serviceData, userId }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteServiceMutation } = useMutation({
    mutationFn: ({ userId, serviceId }: { userId: string; serviceId: string }) =>
      deleteService(userId, serviceId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["single-store"] });
      queryClient.refetchQueries({ queryKey: ["services"] });
    },
  });

  return (
    <div className="space-y-4">
      {serviceData?.map((service) => (
        <div
          key={service._id}
          className="border rounded-lg p-4 flex flex-col space-y-2 bg-white shadow-sm"
        >
          <div className="flex justify-between items-center">
            <Dialog>
              <DialogTrigger asChild>
                <h3 className="text-lg font-medium hover:underline cursor-pointer">
                  {service.name}
                </h3>
              </DialogTrigger>
              <TheUpdateServiceForm serviceId={service._id} />
            </Dialog>

            {/* Background color indicator */}
            <div className="w-8 h-8 rounded-md" style={{ backgroundColor: service?.bgColor }} />
          </div>

          {/* Service Details */}
          <div className="text-sm text-gray-500">
            <p>Pris: {service.price} kr</p>
            <p>Tid: {service.duration} minuter</p>
          </div>

          {/* Actions: Delete Service */}
          <div className="flex justify-end space-x-2">
            <TheDeleteDialog
              deleteMutation={deleteServiceMutation}
              mutationArgs={[{ userId, serviceId: service._id }]} // Pass userId and serviceId to delete the service
              title="Ta bort tjänsten?"
              description="Den här handlingen kommer permanent ta bort tjänsten."
            />

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Redigera
                </Button>
              </DialogTrigger>
              <TheUpdateServiceForm serviceId={service._id} />
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
}
