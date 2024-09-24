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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  duration: z.string().min(1, "Tid får inte vara tomt"),
  price: z.string().min(1, "Tid får inte vara tomt"),
});

export default function TheCreateServiceForm() {
  const queryClient = useQueryClient();
  const {userId} = useParams<{userId: string}>()
  
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

  console.log("user id", session?.user.id)

  const { mutateAsync: createServiceMutation } = useMutation({
    mutationFn: (data: CreateServiceType) => {
      if (session?.user.id) return createService(session?.user.id, data);
      return Promise.reject(new Error("user id is undefined"));
    },
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
      <Card className="max-w-[600px]">
        <CardHeader>
          {" "}
          <h2 className="text-2xl font-semibold tracking-tight">
            Skapa en tjänst
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Fyll i formuläret för att en tjänst
          </p>
        </CardHeader>{" "}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">{mappedFormFields}</CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" className="font-normal">
              Skapa tjänst
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
