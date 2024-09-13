"use client";

import { getAvailableDate } from "@/axios/availableDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { getServicesForSubUser, GetServiceType } from "@/axios/services";
import { bookAppointment } from "@/axios/bookAppointment";
import { AppointmentType } from "@/lib/types";
import TheDatePicker from "./TheDatePicker";
import ThePersonalInformation from "./ThePersonalInformation";

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
      status: "active" | "cancelled";
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
  service: z.string().min(1).max(50),
  date: z.string(),
  time: z.string(),
  status: z.string(),
});

export default function TheBookAppointmentForm({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const { toast, dismiss } = useToast();
  const [step, setStep] = useState(1);

  const {
    data: serviceData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServicesForSubUser(userId),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      phone_number: "",
      service: "",
      time: "",
      status: "active",
    },
  });

  const { mutateAsync: bookAppointmentMutation } = useMutation({
    mutationKey: ["booked-appointment"],
    mutationFn: (data: AppointmentType) => bookAppointment(userId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["booked-appointment"], data);
      queryClient.invalidateQueries({ queryKey: ["available-data"] });
      queryClient.refetchQueries({ queryKey: ["available-data"] });
    },
  });

  if (isLoading) {
    return <p>Loading services...</p>; // Display loading indicator while fetching services
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast({
        title: `Your appointment was booked for ${values.time} on ${values.date}`,
      });
      await bookAppointmentMutation(values);
      // console.log(values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen px-48 py-16 bg-zinc-50 flex flex-col items-center w-full gap-14">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceData &&
                        serviceData.map((service: GetServiceType) => (
                          <SelectItem key={service._id} value={service?._id}>
                            {service?.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {step === 2 && <TheDatePicker form={form} setStep={setStep} />}
          {step === 3 && <ThePersonalInformation form={form} />}
        </form>
      </Form>
    </div>
  );
}
