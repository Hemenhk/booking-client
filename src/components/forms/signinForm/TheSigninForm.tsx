"use client";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
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

import { signinFormFields } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2, "Email must be at least 2 characters"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export default function TheSigninForm() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { toast, dismiss } = useToast();

  // Setting up the form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Attempt sign-in using credentials
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Disable automatic redirect
      });

      if (res?.error) {
        // Handle sign-in errors
        throw new Error(
          "Inloggningen misslyckades. Kontrollera dina uppgifter."
        );
      }

      // Show success toast
      toast({
        title: "Inloggningen lyckades!",
      });

      // Fetch the updated session
      const updatedSession = await fetch("/api/auth/session").then((res) =>
        res.json()
      );

      if (updatedSession?.user) {
        const { role, store, id } = updatedSession.user;

        // Redirect based on user role
        if (role === "store_admin") {
          router.push(`dashboard/admin/${store?.handle}`);
        } else if (role === "sub_user") {
          router.push(`dashboard/user/${store?.handle}/${id}`);
        } else if (role === "user") {
          router.push("/"); // Redirect to home for user role
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Inloggningen misslyckades",
        description: (error as Error).message || "Något gick fel, försök igen.",
        variant: "destructive",
      });
    }
  };

  const mappedFormFields = signinFormFields.map((formField) => (
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
          Logga in
        </h2>
        <p className="text-center mb-5 font-light text-muted-foreground">
          Fyll i formuläret för att logga in på ditt konto
        </p>
        {mappedFormFields}
        <Button type="submit" className="font-normal">
          {status === "loading" ? "Loggar in..." : "Logga in"}
        </Button>
        <p className="text-center text-sm text-muted-foreground font-light pt-3">
          Har du inget konto?{" "}
          <Link href={"/register"} className="underline">
            Registrera dig.
          </Link>
        </p>
      </form>
    </Form>
  );
}
