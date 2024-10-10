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
  profileImage: z.instanceof(File).optional(),
});

type Data = {
  profileImage?: File;
};

type Props = {
  userId: string;
  profileImage: string;
};

export default function TheUpdateProfileForm({ userId, profileImage }: Props) {
  const { toast, dismiss } = useToast();
  const queryClient = useQueryClient();

  // Initialize image preview state with the existing profile image
  const [imagePreview, setImagePreview] = useState<string | null>(
    profileImage || null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: null,
    },
  });

  // Handle profile image change and generate a new preview
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: FormData) => updateUser(userId, data), // Expect FormData instead of Data
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      queryClient.refetchQueries({ queryKey: ["single-store"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage); // Append profile image to FormData
      }

      await mutateAsync(formData); // Pass FormData directly
      toast({
        title: `Din profilbild uppdaterades`,
      });
      setTimeout(() => {
        dismiss();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Fel uppstod",
        description: "Kunde inte uppdatera profilbilden.",
        variant: "destructive",
      });
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
              Välj en ny profilbild
            </p>
          </DialogHeader>

          <FormItem>
            {/* Display preview */}
            <div className="mt-2">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-40 h-40 object-cover rounded-full border"
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt="Placeholder"
                  className="w-40 h-40 object-cover rounded-full border"
                />
              )}
            </div>

            {/* File input for profile image */}
            <Input
              type="file"
              className="h-9 cursor-pointer w-1/3 mt-4"
              accept="image/*"
              onChange={handleProfileImageChange}
            />

            <FormMessage />
          </FormItem>

          <DialogFooter className="px-6 py-4">
            <Button type="submit" className="font-normal">
              Spara
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
