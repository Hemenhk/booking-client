"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
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
import {
  CreateServiceType,
  createService,
  getServicesForSubUser,
  getSingleService,
  updateService,
} from "@/axios/services";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Service } from "@/types/types";
import { tailwindBgColors100 } from "@/lib/bgColors";

const formSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  duration: z.string().min(1, "Tid får inte vara tomt"),
  price: z.string().min(1, "Tid får inte vara tomt"),
  bgColor: z.string(),
});

export default function TheUpdateServiceForm({
  serviceId,
}: {
  serviceId: string;
}) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const {
    data: serviceData,
    isLoading,
    isError,
  } = useQuery<Service>({
    queryKey: ["services", serviceId],
    queryFn: () => getSingleService(serviceId),
  });

  console.log("single service data", serviceData);
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: serviceData?.data?.name || "",
      duration: serviceData?.data?.duration?.toString() || "",
      price: serviceData?.data?.price?.toString() || "",
      bgColor: serviceData?.data?.bgColor || "bg-lime-100",
    },
  });

  const { mutateAsync: updateServiceMutation } = useMutation({
    mutationFn: (data: CreateServiceType) => {
      if (session?.user.id)
        return updateService(session?.user.id, serviceId, data);
      return Promise.reject(new Error("user id is undefined"));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["services"], data);
      queryClient.refetchQueries({ queryKey: ["services"] });
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

      const res = await updateServiceMutation(data);

      toast({
        title: `Tjänsten uppdaterades`,
      });
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const mappedFormFields = serviceFormFields.map((formField) => (
    <FormField
      key={formField.name}
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input
              defaultValue={field.value}
              className={`h-9 rounded-lg `}
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
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            {" "}
            <h2 className="text-2xl font-semibold tracking-tight">
              Skapa en tjänst
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Fyll i formuläret för att en tjänst
            </p>
          </DialogHeader>{" "}
          {mappedFormFields}
          <FormField
            control={form.control}
            name="bgColor"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Bakgrundsfärg</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Välj färg" />
                    </SelectTrigger>
                    <SelectContent>
                      {tailwindBgColors100.map((color) => (
                        <SelectItem key={color} value={color}>
                          <div className={`size-6 rounded-full ${color}`} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter className="py-4">
            <Button type="submit" className="font-normal w-full">
              Updatera tjänsten
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
