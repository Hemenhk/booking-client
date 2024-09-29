"use client";
import { getAllUSerBookedAppointments } from "@/axios/standardUserAppointments";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function UserPage() {
  const { data: session } = useSession();
  const email = session?.user.email;

  const {
    data: appointmentData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user-appointments"],
    queryFn: () => {
      if (email) {
        return getAllUSerBookedAppointments(email);
      }
      return Promise.reject(new Error("User email is undefined"));
    },
  });

  console.log("appointments:", appointmentData);
  return <div>UserPage</div>;
}
