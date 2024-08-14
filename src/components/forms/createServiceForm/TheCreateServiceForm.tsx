"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { serviceFormFields } from "@/lib/utils";
import { CreateServiceType, createSerive } from "@/axios/services";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  duration: z.string().min(1, "Tid får inte vara tomt"),
  price: z.string().min(1, "Tid får inte vara tomt"),
});

export default function TheCreateServiceForm() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: "",
      price: "",
    },
  });

  const { mutateAsync: createServiceMutation } = useMutation({
    mutationFn: (data: CreateServiceType) =>
      createSerive(session?.user.id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["service"], data);
      queryClient.invalidateQueries({ queryKey: ["single-store"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: CreateServiceType = {
        ...values,
        duration: Number(values.duration),
        price: Number(values.price),
      };

      console.log("data", data);

      const res = await createServiceMutation(data);

      toast({
        title: `Ett konto med namnet ${values.name} skapades`,
      });
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const mappedFormFields = serviceFormFields.map((formField) => (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input
              className={`h-9 rounded-lg ${formField.name !== "name" && "w-2/4"}`}
              placeholder={formField.placeholder}
              type="text"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/4 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Skapa en tjänst
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Fyll i formuläret för att en tjänst
        </p>

        {mappedFormFields}
        <Button type="submit" className="font-normal">
          Skapa tjänst
        </Button>
      </form>
    </Form>
  );
}
