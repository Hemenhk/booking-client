import { cancelBookedAppointment } from "@/axios/bookAppointment";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleDollarSign, Clipboard, Clock, Phone, User } from "lucide-react";
import { HiOutlineEnvelope } from "react-icons/hi2";

type Props = {
  appointment: AppointmentType;
};

export default function TheUserAppointmentDialog({ appointment }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync: cancelAppointmentMutation } = useMutation({
    mutationFn: (id: string) => cancelBookedAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-data"] });
      queryClient.invalidateQueries({ queryKey: ["sub-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["weekly-appointments"] });
      queryClient.refetchQueries({ queryKey: ["weekly-appointments"] });
      queryClient.refetchQueries({ queryKey: ["sub-appointments"] });
    },
  });

  const gridContent = [
    {
      icon: <Clipboard className="text-blue-600" />,
      title: "Service",
      content: appointment?.service?.name,
    },
    {
      icon: <User className="text-blue-600" />,
      title: "Utövare",
      content: appointment.service.createdBy.name,
    },
    {
      icon: <Clock className="text-blue-600" />,
      title: "Tid",
      content: appointment.date,
    },
    {
      icon: <CircleDollarSign className="text-blue-600" />,
      title: "Pris",
      content: appointment.service.price,
    },
  ];

  const mappedGridContent = gridContent.map((con) => (
    <div className="flex items-center gap-2" key={con.title}>
      {con.icon}
      <div className="flex flex-col">
        <h3 className="text-gray-500 text-xs">{con.title}</h3>
        <p className="text-sm">{con.content}</p>
      </div>
    </div>
  ));

  return (
    <DialogContent className="max-w-md">
      <DialogHeader className="border-b py-5">
        <DialogTitle>
          {appointment.name} {appointment.last_name}
        </DialogTitle>
        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={15} />
            {appointment.phone_number}
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineEnvelope />
            <span className="underline">{appointment.email}</span>
          </div>
        </div>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">{mappedGridContent}</div>
      <div className="border-t pt-5 mt-5 flex justify-end gap-2">
        <Button
          className="w-32"
          onClick={() => cancelAppointmentMutation(appointment._id)}
        >
          Avboka
        </Button>
      </div>
    </DialogContent>
  );
}
