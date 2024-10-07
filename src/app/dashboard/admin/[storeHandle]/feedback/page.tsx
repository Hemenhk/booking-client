"use client";

import { createFeedback, Feedback } from "@/axios/feedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";

// Updated form schema, remove store and adminId from user input validation
const formSchema = z.object({
  title: z.string().min(1, "Ämnet får inte vara tomt"),
  message: z.string().min(1, "Meddelandet får inte vara tomt"),
});

export default function TheFeedbackPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  // Create form with only title and message fields
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  // Mutation to handle feedback creation
  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (data: Feedback) => {
      if (session?.user.store._id) {
        return createFeedback(session?.user.store._id, data);
      }
      return Promise.reject(new Error("User ID is undefined"));
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["feedback"], data);
      queryClient.refetchQueries({ queryKey: ["feedback"] });
    },
  });

  if (!session?.user.store._id) {
    return <div>Ingen butik hittades</div>;
  }

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Add storeId and adminId to the request body manually
      const data: Feedback = {
        ...values,
        store: session?.user.store._id, // add storeId from the router params
        adminId: session?.user.id || "", // add adminId from session
      };

      // Log data for debugging
      console.log("Submitting feedback data:", data);

      const res = await mutateAsync(data);

      // Show toast notification on success
      toast({
        title: `En feedback med ämnet "${values.title}" skapades`,
      });

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
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lämna Feedback</CardTitle>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Title field */}
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ämne</FormLabel>
                  <FormControl>
                    <Input
                      className={`h-9 rounded-lg `}
                      placeholder="Ämne"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meddelande</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berätta vad vi kan hjälpa er med"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t pt-7 w-full">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Skickar..." : "Skicka feedback"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
