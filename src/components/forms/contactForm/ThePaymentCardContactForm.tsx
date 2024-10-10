"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

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

import { Contact, createQuestion } from "@/axios/contact";
import { usePathname } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1, "Mejladdressen får inte vara tomt"),
  name: z.string().min(1, "Namnet får inte vara tomt"),
  phone_number: z.string().min(1, "Telefonnumret får inte vara tomt"),
});

type CreateContact = {
  email: string;
  name: string;
  phone_number: string;
};

export default function ThePaymentCardContactForm() {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: "",
      email: "",
      name: "",
    },
  });

  const { mutateAsync, isError, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateContact) => createQuestion(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["contact-form"], data);
      queryClient.refetchQueries({ queryKey: ["contact-form"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting contact data:", values);

      const contactData: CreateContact = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
      };
      const res = await mutateAsync(contactData);

      // Show toast notification on success
      toast({
        title: `Din fråga skickades`,
      });

      form.reset();
      console.log("Feedback response:", res);
      setTimeout(() => {
        dismiss();
      }, 3000);
    } catch (error) {
      console.log("Error submitting feedback:", error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[450px] space-y-4"
      >
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Namn</FormLabel>
              <FormControl>
                <Input
                  className="h-10 rounded-md"
                  placeholder="För- och efternamn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mejladress</FormLabel>
              <FormControl>
                <Input
                  className="h-10 rounded-md"
                  placeholder="mejl@exempel.se"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input
                  className="h-10 rounded-md"
                  placeholder="070-XXXXXXX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-light" disabled={isPending}>
          {isPending ? "Skickar..." : "Skicka fråga"}
        </Button>
      </form>
    </Form>
  );
}
