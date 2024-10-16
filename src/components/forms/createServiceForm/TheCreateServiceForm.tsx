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
import { CreateServiceType, createService } from "@/axios/services";
import { useSession } from "next-auth/react";

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
import { tailwindBgColors100 } from "@/lib/bgColors";

const formSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  duration: z.string().min(1, "Tid får inte vara tomt"),
  price: z.string().min(1, "Tid får inte vara tomt"),
  bgColor: z.string(),
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
      bgColor: "bg-lime-100",
    },
  });

  console.log("user id", session?.user.id);

  const { mutateAsync: createServiceMutation } = useMutation({
    mutationFn: (data: CreateServiceType) => {
      if (session?.user.id) return createService(session?.user.id, data);
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
        name: values.name, // Make sure name is included
        bgColor: values.bgColor, // Ensure bgColor is also mandatory
        duration: Number(values.duration), // Convert duration to number
        price: Number(values.price), // Convert price to number
      };

      console.log("data", data);

      const res = await createServiceMutation(data);

      toast({
        title: `En tjänst med namnet ${values.name} skapades`,
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
          <DialogFooter className="px-6 py-4">
            <Button type="submit" className="font-normal">
              Skapa tjänst
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
