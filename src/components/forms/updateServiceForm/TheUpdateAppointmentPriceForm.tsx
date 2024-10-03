"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { updateAppointmentPrice } from "@/axios/bookAppointment";

const formSchema = z.object({
  newPrice: z.string(),
});

type NewPrice = {
    newPrice: number
}

type Props = {
  appointmentId: string;
  appointmentPrice: number;
};

export default function TheUpdateAppointmentPriceForm({
  appointmentId,
  appointmentPrice,
}: Props) {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPrice: appointmentPrice.toString() || "0",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: NewPrice) => {
      return updateAppointmentPrice(appointmentId, data.newPrice);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { newPrice } = values;
      const parsedNewPrice = parseInt(newPrice);
      await mutateAsync({newPrice: parsedNewPrice});
      toast({
        title: `Lösenorden ändrades!`,
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
      toast;
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <DialogContent className="overflow-hidden max-w-[600px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ändra Priset
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Fyll i fälten för att ändra ditt lösenord
            </p>
          </DialogHeader>
          <FormField
            control={form.control}
            name="newPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pris</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    defaultValue={field.value}
                    value={field.value}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="px-6 py-4">
            <Button type="submit" className="font-normal">
              Spara
            </Button>
          </DialogFooter>
        </form>{" "}
      </DialogContent>
    </Form>
  );
}
