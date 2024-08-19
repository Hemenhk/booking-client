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

  return <><TheAppointmentForm userId={params.userId} /></>
}
