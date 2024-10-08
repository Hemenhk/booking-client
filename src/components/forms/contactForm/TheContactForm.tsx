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
import { contactFormFields } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Ämnet får inte vara tomt"),
  email: z.string().min(1, "Mejladdressen får inte vara tomt"),
  name: z.string().min(1, "Namnet får inte vara tomt"),
  message: z.string().min(1, "Meddelandet får inte vara tomt"),
});

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
    mutationFn: (data: Contact) => createQuestion(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["contact-form"], data);
      queryClient.refetchQueries({ queryKey: ["contact-form"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting contact data:", values);

      const res = await mutateAsync(values);

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

  const mappedFormFields = contactFormFields.map((f) => (
    <FormField
      key={f.name}
      control={form.control}
      name={f.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{f.label}</FormLabel>
          <FormControl>
            <Input
              className={`h-10 rounded-md `}
              placeholder={f.placeholder}
              type={f.type}
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
        className="w-[450px] space-y-6"
      >
        {mappedFormFields}
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
