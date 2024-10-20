"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOpeningHours } from "@/axios/stores";
import { useSession } from "next-auth/react";
import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useParams } from "next/navigation";
import { OpeningHours } from "@/types/types";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Generate time slots (from 00:00 to 23:30, with 30-minute intervals)
const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

const formSchema = z.object({
  monday: z.object({
    open: z.string().optional(),
    break: z.string().optional(),
    breakOver: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().default(false),
  }),
  tuesday: z.object({
    open: z.string().optional(),
    break: z.string().optional(),
    breakOver: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().default(false),
  }),
  wednesday: z.object({
    open: z.string().optional(),
    break: z.string().optional(),
    breakOver: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().default(false),
  }),
  thursday: z.object({
    open: z.string().optional(),
    break: z.string().optional(),
    breakOver: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().default(false),
  }),
  friday: z.object({
    open: z.string().optional(),
    break: z.string().optional(),
    breakOver: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().default(false),
  }),
  saturday: z.object({
    open: z.string().optional(),
    break: z.string().optional(),
    breakOver: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().default(false),
  }),
  sunday: z.object({
    open: z.string().optional(),
    break: z.string().optional(),
    breakOver: z.string().optional(),
    close: z.string().optional(),
    closed: z.boolean().default(false),
  }),
});

export default function TheOpeningHoursForm() {
  const { toast, dismiss } = useToast();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { storeHandle } = useParams<{ storeHandle: string }>();
  const { storeData, isLoading } = useAdminQuery(storeHandle);

  // Default values for form (mapping opening hours)
  const defaultValues = storeData?.store.opening_hours?.[0]
    ? {
        monday: storeData.store.opening_hours[0].monday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        tuesday: storeData.store.opening_hours[0].tuesday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        wednesday: storeData.store.opening_hours[0].wednesday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        thursday: storeData.store.opening_hours[0].thursday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        friday: storeData.store.opening_hours[0].friday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        saturday: storeData.store.opening_hours[0].saturday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        sunday: storeData.store.opening_hours[0].sunday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
      }
    : {
        monday: {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        tuesday: {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        wednesday: {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        thursday: {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        friday: {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        saturday: {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        sunday: {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
      };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (storeData?.store.opening_hours?.[0]) {
      const openingHours = storeData.store.opening_hours[0];
      const newDefaultValues = {
        monday: openingHours.monday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        tuesday: openingHours.tuesday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        wednesday: openingHours.wednesday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        thursday: openingHours.thursday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        friday: openingHours.friday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        saturday: openingHours.saturday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
        sunday: openingHours.sunday || {
          open: "",
          break: "",
          breakOver: "",
          close: "",
          closed: false,
        },
      };
      form.reset(newDefaultValues);
    }
  }, [storeData, form]);

  const { mutateAsync: updateOpeningHoursMutation } = useMutation({
    mutationFn: (data: OpeningHours) => {
      if (session?.user.store._id) {
        return updateOpeningHours(session?.user.store._id, data);
      } else {
        return Promise.reject(new Error("store id is undefined"));
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
      queryClient.refetchQueries({ queryKey: ["single-store"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedValues: OpeningHours = {
        monday: {
          open: values.monday.open || "",
          break: values.monday.break || "",
          breakOver: values.monday.breakOver || "",
          close: values.monday.close || "",
          closed: values.monday.closed,
        },
        tuesday: {
          open: values.tuesday.open || "",
          break: values.tuesday.break || "", // Ensure this is included
          breakOver: values.tuesday.breakOver || "", // Ensure this is included
          close: values.tuesday.close || "",
          closed: values.tuesday.closed,
        },
        wednesday: {
          open: values.wednesday.open || "",
          break: values.wednesday.break || "", // Ensure this is included
          breakOver: values.wednesday.breakOver || "", // Ensure this is included
          close: values.wednesday.close || "",
          closed: values.wednesday.closed,
        },
        thursday: {
          open: values.thursday.open || "",
          break: values.thursday.break || "", // Ensure this is included
          breakOver: values.thursday.breakOver || "", // Ensure this is included
          close: values.thursday.close || "",
          closed: values.thursday.closed,
        },
        friday: {
          open: values.friday.open || "",
          break: values.friday.break || "", // Ensure this is included
          breakOver: values.friday.breakOver || "", // Ensure this is included
          close: values.friday.close || "",
          closed: values.friday.closed,
        },
        saturday: {
          open: values.saturday.open || "",
          break: values.saturday.break || "", // Ensure this is included
          breakOver: values.saturday.breakOver || "", // Ensure this is included
          close: values.saturday.close || "",
          closed: values.saturday.closed,
        },
        sunday: {
          open: values.sunday.open || "",
          break: values.sunday.break || "", // Ensure this is included
          breakOver: values.sunday.breakOver || "", // Ensure this is included
          close: values.sunday.close || "",
          closed: values.sunday.closed,
        },
      };

      console.log("formatted values:", formattedValues); // Debugging

      const res = await updateOpeningHoursMutation(formattedValues);
      toast({
        title: "Öppettiderna uppdaterades!",
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
      console.log("Updated Opening Hours: ", res);
    } catch (error) {
      console.error("Error updating opening hours:", error);
    }
  };

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Call `useWatch` for each day outside of the map
  const watchedFields = useWatch({
    control: form.control,
    name: daysOfWeek.map((day) => `${day}.closed`) as any,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Form {...form}>
      <Card className="overflow-hidden max-w-[700px] mx-2 md:mx-0">
        <CardHeader>
          <CardTitle>Lägg till Öppettider</CardTitle>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            {daysOfWeek.map((day, index) => {
              const isClosed = watchedFields[index];

              return (
                <div key={day} className="flex flex-col border-b py-4 gap-3 pb-6">
                  <h3 className="capitalize font-medium">{day}</h3>
                  <div className="flex flex-row items-center gap-4">
                    {!isClosed && (
                      <>
                        <FormField
                          control={form.control}
                          name={`${day}.open` as any}
                          render={({ field }) => (
                            <FormItem className="w-1/4">
                              <FormLabel>Öppnar</FormLabel>
                              <FormControl>
                                <Select
                                  key={field.value}
                                  value={field.value}
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Öppnar" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`${day}.break` as any}
                          render={({ field }) => (
                            <FormItem className="w-1/4">
                              <FormLabel>Rast börjar</FormLabel>

                              <FormControl>
                                <Select
                                  key={field.value}
                                  value={field.value}
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Rast börjar" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`${day}.breakOver` as any}
                          render={({ field }) => (
                            <FormItem className="w-1/4">
                              <FormLabel>Rast slutar</FormLabel>

                              <FormControl>
                                <Select
                                  key={field.value}
                                  value={field.value}
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Rast slut" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`${day}.close` as any}
                          render={({ field }) => (
                            <FormItem className="w-1/4">
                              <FormLabel>Stänger</FormLabel>

                              <FormControl>
                                <Select
                                  key={field.value}
                                  value={field.value}
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Stänger" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {isClosed && (
                      <>
                        <FormField
                          control={form.control}
                          name={`${day}.open` as any}
                          render={() => (
                            <FormItem className="w-1/4">
                              <FormControl>
                                <Select disabled value="">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Stängt" />
                                  </SelectTrigger>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`${day}.close` as any}
                          render={() => (
                            <FormItem className="w-1/4">
                              <FormControl>
                                <Select disabled value="">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Stängt" />
                                  </SelectTrigger>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <FormField
                      control={form.control}
                      name={`${day}.closed` as any}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 mt-7 space-y-0 p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked)
                              }
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Stängd</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Bekräfta öppettider
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
