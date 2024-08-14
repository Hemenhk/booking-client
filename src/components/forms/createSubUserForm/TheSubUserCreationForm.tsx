"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSubUser, createSubUser } from "@/axios/stores";
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
import { subUserFormFields } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Sub user name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Props = {
  storeId: string;
};

export default function TheSubUserCreationForm({ storeId }: Props) {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createSubUserMutation } = useMutation({
    mutationFn: (data: CreateSubUser) => createSubUser(storeId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast({
        title: `Ett konto med namnet ${values.name} skapades`,
      });
      await createSubUserMutation(values);
      // console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const mappedFormFields = subUserFormFields.map((formField) => (
    <FormField
      key={formField.name}
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>{formField.label}</FormLabel> */}
          <FormControl>
            <Input
              className="h-9 rounded-lg"
              placeholder={formField.placeholder}
              type={formField.type}
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-3 mx-auto flex flex-col justify-center w-3/5"
      >
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Registrera ett konto
        </h2>
        <p className="text-center mb-5 text-sm text-muted-foreground">
          Fyll i formuläret för att registrera ett konto hos din butik
        </p>
        {mappedFormFields}
        <Button type="submit" className="font-normal">
          Skapa konto
        </Button>
      </form>
    </Form>
  );
}
