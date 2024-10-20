"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { bookAppointment, CreateAppointment } from "@/axios/bookAppointment";
import { AppointmentType } from "@/lib/types";
import TheDatePicker from "./TheDatePicker";
import ThePersonalInformation from "./ThePersonalInformation";
import { Appointment, Service } from "@/types/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, CheckCircle } from "lucide-react";

type DatePickerProps = {
  setStep: (value: SetStateAction<number>) => void;
  form: UseFormReturn<
    {
      name: string;
      last_name: string;
      email: string;
      phone_number: string;
      service: string;
      date: string;
      time: string;
    },
    any,
    undefined
  >;
};

const formSchema = z.object({
  name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  email: z.string().min(1).email(),
  phone_number: z.string().min(1),
  service: z.string().min(1).max(100),
  date: z.string(),
  time: z.string(),
});

type Props = {
  storeHandle: string;
  userId: string;
};

export default function TheBookAppointmentForm({ storeHandle, userId }: Props) {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();
  const [step, setStep] = useState(1);

  const savedService = localStorage.getItem("service");

  const service: Service = JSON.parse(savedService);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      phone_number: "",
      service: service?._id,
      time: "",
    },
  });

  const { mutateAsync: bookAppointmentMutation } = useMutation({
    mutationKey: ["booked-appointment"],
    mutationFn: (data: CreateAppointment) =>
      bookAppointment(userId, storeHandle, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["booked-appointment"], data);
      queryClient.invalidateQueries({ queryKey: ["available-data"] });
      queryClient.refetchQueries({ queryKey: ["available-data"] });
    },
  });
  if (!service) {
    return <div>Ingen service valdes</div>;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!service) {
        throw new Error("Service is not defined");
      }

      const appointmentData: CreateAppointment = {
        name: values.name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        service: service._id, // Use the complete service object here
        time: values.time,
        date: values.date,
      };

      toast({
        title: `Your appointment was booked for ${values.time} on ${values.date}`,
      });

      await bookAppointmentMutation(appointmentData);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  // Watch for date and time updates from the form
  const watchedDate = form.watch("date");
  const watchedTime = form.watch("time");

  const calculateEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(
      2,
      "0"
    )}`;
  };

  // Function to format the time range display
  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  const endTime = calculateEndTime(watchedTime, service.duration);

  return (
    <div className="px-48 py-28 bg-zinc-50 flex flex-col items-center w-full gap-14">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <TheDatePicker form={form} setStep={setStep} />}
          {step === 2 && (
            <ThePersonalInformation form={form} step={step} setStep={setStep} />
          )}
          {step === 3 && (
            <Card className="shadow-none bg-transparent border-none w-[370px] md:w-[500px] max-w-[700px] py-8 text-center space-y-8">
              <CardHeader className="border-b pb-4">
                {/* <CheckCircle className="mx-auto mb-3" size={50} /> */}
                <div className="bg-violet-600 text-white flex size-20 justify-center items-center rounded-full mx-auto mb-10">
                  <Check size={50} />
                </div>

                <CardTitle className="text-4xl font-medium text-violet-700">Woo hoo!</CardTitle>
                <CardDescription className="w-4/5 mx-auto text-base pt-4">
                  {service.name} bokades för den{" "}
                  <span className="font-medium">
                    {watchedDate ? watchedDate : "Ej valt datum"}
                  </span>{" "}
                  kl.{" "}
                  <span className="font-medium">
                    {watchedTime
                      ? formatTimeRange(watchedTime, endTime)
                      : "Ej valt tid"}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">
                  <Link href={"/signin"} className="underline">
                    Logga in
                  </Link>{" "}
                  på ditt konto för att se dina bokade tider
                </p>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
}
