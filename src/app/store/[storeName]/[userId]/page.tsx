import { bookAppointment } from "@/axios/bookAppointment";
import TheAppointmentForm from "@/components/forms/TheAppointmentForm";
import { AppointmentType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function BookUserPage({
  params,
}: {
  params: { userId: string };
}) {
//   const queryClient = useQueryClient();
//   const {
//     data: bookingData,
//     isError,
//     isPending,
//   } = useMutation({
//     mutationFn: (data: AppointmentType) => bookAppointment(params.userId, data),
//     onSuccess: (data) => {
//       queryClient.setQueryData(["booking"], data);
//       // queryClient.invalidateQueries({ queryKey: ["single-store"] });
//     },
//   });

  return <><TheAppointmentForm userId={params.userId} /></>
}
