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

import { Textarea } from "@/components/ui/textarea";
import { Contact, createQuestion } from "@/axios/contact";

const formSchema = z.object({
  title: z.string().min(1, "Ämnet får inte vara tomt"),
  email: z.string().min(1, "Mejladdressen får inte vara tomt"),
  name: z.string().min(1, "Namnet får inte vara tomt"),
  message: z.string().min(1, "Meddelandet får inte vara tomt"),
});

type CreateContact = {
  title: string
  email: string
  name: string
  message: string
}

export default function TheContactForm() {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      email: "",
      name: "",
      message: "",
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
        message: values.message,
        title: values.title
      
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ämne</FormLabel>
              <FormControl>
                <Input
                  className="h-10 rounded-md"
                  placeholder="Ange ämne"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* <FormField
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
        /> */}
        {/* Conditionally render the message field based on isPaymentCardsPage */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meddelande</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Berätta vad vi kan hjälpa er med"
                  className="resize-none rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit button */}
        <Button
          type="submit"
          className="w-full font-light text-base"
          disabled={isPending}
        >
          {isPending ? "Skickar..." : "Skicka fråga"}
        </Button>
      </form>
    </Form>
  );
}
