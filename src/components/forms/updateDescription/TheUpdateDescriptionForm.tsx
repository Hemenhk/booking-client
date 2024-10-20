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

import { Textarea } from "@/components/ui/textarea";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStore } from "@/axios/stores";
import { Store } from "@/types/types";
import { useSession } from "next-auth/react";
import { useAdminQuery } from "@/hooks/useAdminQuery";

const formSchema = z.object({
  description: z
    .string()
    .min(1, {
      message: "Beskrivningen får inte vara tom.",
    })
    .max(1000, {
      message: "Beskrivningen får högst bestå av 1000 karaktärer.",
    }),
});

export default function TheUpdateDescriptionForm() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const { storeData } = useAdminQuery(session?.user.store.handle);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      description: storeData?.store.description || "",
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
      queryClient.refetchQueries({ queryKey: ["single-store"] });
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedStoreData: Store = {
        ...storeData.store, // Spread existing store data
        description: values.description, // Update descriåtion
      };
      const res = await mutateAsync(updatedStoreData);
      toast({
        title: `Butikens beskrivning ändrades!`,
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
      toast;
      console.log(values);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <DialogContent className="overflow-hidden max-w-[600px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ändra Butikens beskrivning
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Fyll i fälten för att ändra din butiks beskrivning
            </p>
          </DialogHeader>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Butikens beskrivning</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Berätta lite om er för kunderna"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="px-6 py-4">
            <Button type="submit" className="font-normal">
              Spara
            </Button>
          </DialogFooter>
        </form>{" "}
      </DialogContent>
    </Form>
  );
}
