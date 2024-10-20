"use client";

import Rating from "@mui/material/Rating";
import { getSingleAppointment } from "@/axios/bookAppointment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { CreateReview, createReview } from "@/axios/review";

// Form schema using Zod
const formSchema = z.object({
  review: z.string().min(1, "Recensionen får inte vara tomt"),
  reviewer: z.string().min(1, "Fältet får inte vara tomt"),
  rating: z
    .number()
    .min(1, "Du måste åtminstone ge 1 stjärna")
    .max(5, "Du kan högst ge 5 stjärnor"),
});

export default function LeaveReviewPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  const { appointmentId } = params;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  // Fetch the single appointment data
  const {
    data: appointmentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-appointment", appointmentId],
    queryFn: () => getSingleAppointment(appointmentId),
  });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reviewer: "",
      review: "",
      rating: 0,
    },
  });

  // Mutation to create a review
  const { mutateAsync, isPending: isSubmitting } = useMutation({
    mutationFn: (data: CreateReview) => createReview(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["review"], data);
      queryClient.refetchQueries({ queryKey: ["single-store"] });
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!appointmentData) {
        throw new Error("Appointment data is missing.");
      }

      const store = appointmentData.appointment.createdBy.store._id;

      // Combine form values with the store ID
      const updatedValues = { ...values, store };

      // Submit the form
      await mutateAsync(updatedValues);

      // Show success toast
      toast({
        title: "Recension skickad",
        description: "Tack för din recension!",
      });

      // Redirect after successful submission
      router.push("/");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Något gick fel. Försök igen senare.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="my-28 w-full flex justify-center items-center">
      <Card className="w-[450px] shadow-md">
        <CardHeader>
          <CardTitle>Lämna en recension</CardTitle>
          <CardDescription>
            {appointmentData?.appointment?.createdBy.store.name} vill gärna veta
            vad du tycker om din upplevelse
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Reviewer Name */}
              <FormField
                control={form.control}
                name="reviewer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ditt namn</FormLabel>
                    <FormControl>
                      <Input
                        className="h-9 rounded-lg"
                        placeholder="Ditt namn"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Betyg</FormLabel>
                    <FormControl>
                      <Rating
                        name="simple-controlled"
                        sx={{
                          fontSize: "2rem",
                        }}
                        value={field.value}
                        onChange={(_, newValue) => {
                          field.onChange(newValue); // Update form rating field
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Review Text */}
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recension</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Dela med dig om din upplevelse"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Submit Button */}
            <CardFooter className="border-t py-4">
              <Button
                type="submit"
                className="w-full font-light text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Skickar..." : "Lämna feedback"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
