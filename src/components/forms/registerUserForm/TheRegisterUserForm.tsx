"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerFormFields } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUser, createUser } from "@/axios/user";

// Regex for password validation
const passwordRequirements =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z
  .object({
    email: z.string().min(2, "Email borde vara åtminstone 2 karaktärer"),
    name: z.string().min(1, "Namnet borde vara åtminstone en karaktärer"),
    password: z
      .string()
      .trim()
      .min(8, "Lösenordet borde vara åtminstone 6 karaktärer")
      .regex(
        passwordRequirements,
        "Lösenordet måste innehålla åtminstone en stor bokstav, en liten bokstav, ett nummer och en speciell karaktär"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lösenorden stämmer inte överens",
    path: ["confirmPassword"], // path of error
  });

export default function TheRegisterUserForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast, dismiss } = useToast();

  // Setting up the form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutateAsync: createUserMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: CreateUser) => createUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], data);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { confirmPassword, ...userData } = values;
      const res = await createUserMutation(userData);

      // Handle success (e.g., show a success toast, redirect, etc.)
      toast({
        title: "Kontot skapades",
        description: "Din konto har skapats. Du kan nu logga in",
      });

      setTimeout(() => {
        dismiss();
      }, 2000);

      // Optionally redirect after registration
      router.push("/signin");
    } catch (error) {
      toast({
        title: "Error",
        description: "Något gick fel.",
      });
    }
  };

  const mappedFormFields = registerFormFields.map((formField) => (
    <FormField
      key={formField.name}
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
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
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Skapa konto
        </h2>
        <p className="text-center mb-5 font-light text-muted-foreground">
          Fyll i formuläret för att skapa ditt konto
        </p>
        {mappedFormFields}
        <Button type="submit" className="font-normal">
          {isPending ? "Skapar konto..." : "Skapa konto"}
        </Button>
        <p className="text-center text-sm text-muted-foreground font-light pt-3">
          Har du ett konto?{" "}
          <Link href={"/signin"} className="underline">
            Logga in.
          </Link>
        </p>
      </form>
    </Form>
  );
}
