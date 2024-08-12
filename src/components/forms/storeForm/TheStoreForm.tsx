"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateStore, createStore } from "@/axios/stores";
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
// import { useRouter } from "next/router";

// Validation schema using Zod
const formSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  adminName: z.string().min(2, "Admin name must be at least 2 characters"),
  adminEmail: z.string().email("Invalid email address"),
  adminPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const formFields = [
  {
    name: "storeName",
    type: "text",
    label: "Butikens namn",
    placeholder: "Butikens namn",
  },
  {
    name: "adminName",
    type: "text",
    label: "Admins namn",
    placeholder: "Admins namn",
  },
  {
    name: "adminEmail",
    type: "email",
    label: "Admins Email",
    placeholder: "Admins Email",
  },
  {
    name: "adminPassword",
    type: "password",
    label: "Lösenord",
    placeholder: "Lösenord",
  },
];

export default function TheStoreForm() {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  // Setting up the form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      adminName: "",
      adminEmail: "",
      adminPassword: "",
    },
  });

  const { mutateAsync: createStoreMutation } = useMutation({
    mutationFn: (data: CreateStore) => createStore(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast({
        title: `Din butik med namnet ${values.storeName} skapades`,
      });
      await createStoreMutation(values);
      // console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const mappedFormFields = formFields.map((formField) => (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input
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
        className="space-y-8 w-2/4 my-2"
      >
        {mappedFormFields}
        <Button type="submit">Skapa konto</Button>
      </form>
    </Form>
  );
}
