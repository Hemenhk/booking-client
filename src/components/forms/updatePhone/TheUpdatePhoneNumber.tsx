"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStore } from "@/axios/stores";
import { Store } from "@/types/types";
import { useSession } from "next-auth/react";
import { useAdminQuery } from "@/hooks/useAdminQuery";

const formSchema = z.object({
  phone_number: z.string().min(1),
});

export default function TheUpdatePhoneNumber() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const { storeData } = useAdminQuery(session?.user.store.handle);

  console.log("storedata", storeData)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      phone_number: storeData?.phone_number || "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: Store) => {
      if (session?.user.store._id) {
        return updateStore(session?.user.store._id, data);
      } else {
        return Promise.reject(new Error("store id is undefined"));
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
      queryClient.refetchQueries({ queryKey: ["store"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { phone_number } = values;
      await mutateAsync(phone_number);
      toast({
        title: `Butikens nummer ändrades!`,
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
      toast;
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader>
          <CardTitle>Ändra Telefonnummer</CardTitle>
          <CardDescription>
            Fyll i fälten för att ändra ditt nummer
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefonnummer</FormLabel>
                  <FormControl>
                    <Input type="text" value={field.value} {...field}/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" className="font-normal">
              Spara
            </Button>
          </CardFooter>
        </form>{" "}
      </Card>
    </Form>
  );
}
