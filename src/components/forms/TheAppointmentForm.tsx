"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getServicesForSubUser, GetServiceType } from "@/axios/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import DatePicker from "./DatePicker";
import PersonalInformation from "./PersonalInformation";
import { useToast } from "../ui/use-toast";
import { bookAppointment } from "@/axios/bookAppointment";
import { AppointmentType } from "@/lib/types";
import { useParams } from "next/navigation";

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

type Props ={
storeHandle: string;
userId: string
}

export default function TheAppointmentForm({storeHandle, userId} : Props) {
  const queryClient = useQueryClient();
  // const { storeHandle, userId } = useParams<{
  //   storeHandle: string;
  //   userId: string;
  // }>();
  // const params = useParams()

  // console.log("params",params)

  // console.log("user id", userId);

  const { toast, dismiss } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const {
    data: serviceData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServicesForSubUser(userId),
  });

  console.log("services", serviceData);

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
    mutationFn: (data: AppointmentType) =>
      bookAppointment(userId, storeHandle, data),
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
     const res = await bookAppointmentMutation(values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-2/4 mx-auto my-2"
      >
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
        {step === 2 && <DatePicker setStep={setStep} form={form} />}
        {step === 3 && <PersonalInformation form={form} />}
        <div className="flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              onClick={() => setStep((prevStep) => prevStep - 1)}
            >
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button
              type="button"
              onClick={() => {
                if (step === 1 && !form.getValues("service")) {
                  alert("Please select a service");
                } else if (step === 2 && !form.getValues("date")) {
                  alert("Please select a date and time");
                } else {
                  setStep((prevStep) => prevStep + 1);
                }
              }}
            >
              Next
            </Button>
          )}
        </div>
        {step === 3 && <Button type="submit">Book</Button>}
      </form>
    </Form>
  );
}
