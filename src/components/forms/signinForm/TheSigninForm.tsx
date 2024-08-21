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

const formSchema = z.object({
  email: z.string().min(2, "Email must be at least 2 characters"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export default function TheSigninForm() {
  const { data: session } = useSession();

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
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.ok) {
        const storeHandle = session?.user?.store.handle;
        const userId = session?.user?.id;
        if (storeHandle) {
          setTimeout(() => {
            if (session?.user.role === "store_admin") {
              router.push(`dashboard/admin/${storeHandle}`);
            } else if (session?.user.role === "sub_user") {
              router.push(`dashboard/user/${storeHandle}/${userId}`);
            }
          }, 2500);
        }
      }
      toast({
        title: `Inloggningen lyckades!`,
      });

      setTimeout(() => {
        dismiss();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const mappedFormFields = signinFormFields.map((formField) => (
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
        className="gap-5 mx-auto flex flex-col justify-center w-3/5"
      >
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Logga in på ditt konto
        </h2>
        <p className="text-center mb-5 text-sm text-muted-foreground">
          Fyll i formuläret för att logga in på ditt konto
        </p>
        {mappedFormFields}
        <Button type="submit" className="font-normal">
          Logga in
        </Button>
      </form>
    </Form>
  );
}
