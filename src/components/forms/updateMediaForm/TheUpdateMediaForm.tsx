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
import { mediaFormFields } from "@/lib/utils";

const formSchema = z.object({
  tiktok: z.string(),
  youtube: z.string(),
  instagram: z.string(),
  facebook: z.string(),
  x: z.string(),
});

export default function TheUpdateMediaForm({
  storeHandle,
}: {
  storeHandle: string;
}) {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const { storeData } = useAdminQuery(storeHandle);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      tiktok: storeData?.store?.social_media?.tiktok || "",
      youtube: storeData?.store?.social_media?.youtube || "",
      instagram: storeData?.store?.social_media?.instagram || "",
      facebook: storeData?.store?.social_media?.facebook || "",
      x: storeData?.store?.social_media?.x || "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: Store) => {
      if (storeData?.store._id) {
        return updateStore(storeData?.store._id, data);
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
        const payload = { social_media: values };

        console.log("Payload being sent to API", payload);
  
        const res = await mutateAsync(payload);
      toast({
        title: `Butikens sociala medier ändrades!`,
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
      toast;
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const mappedFormFields = mediaFormFields.map((f) => (
    <FormField
      key={f.name}
      control={form.control}
      name={f.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{f.label}</FormLabel>
          <FormControl>
            <Input type={f.type} value={field.value} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  ));
  return (
    <Form {...form}>
      <DialogContent className="overflow-hidden max-w-[600px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ändra Telefonnummer
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Fyll i fälten för att ändra ditt nummer
            </p>
          </DialogHeader>
          {mappedFormFields}
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
