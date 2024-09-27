"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormItem, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { updateUser } from "@/axios/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const formSchema = z.object({
  profileImage: z.instanceof(File),
});

type Data = {
  profileImage: File;
};

type Props = {
  userId: string;
};

export default function TheUpdateProfileForm({ userId }: Props) {
  const { toast, dismiss } = useToast();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: null,
    },
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: Data) => updateUser(userId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync(values);
      toast({
        title: `Din profilbild uppdaterades`,
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
      console.log(values);
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
              Ändra Profilbild
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Fyll i fälten för att ändra din profilbild
            </p>
          </DialogHeader>

          <FormItem>
            {imagePreview ? (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Logo Preview"
                  className="size-40 object-cover rounded-full border"
                />
              </div>
            ) : (
              <img
                src="/placeholder.png"
                alt="Logo Preview"
                className="size-40 object-cover rounded-full borde"
              />
            )}
            <Input
              type="file"
              className="h-9 cursor-pointer w-1/3"
              accept="image/*"
              onChange={handleLogoChange}
            />

            <FormMessage />
          </FormItem>
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
