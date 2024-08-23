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

import { updateUser } from "@/axios/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const formSchema = z.object({
  profileImage: z.instanceof(File),
});

type Data = {
  profileImage: File;
};

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId: string }>();
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

      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader>
          <CardTitle> Lägg till profilbild</CardTitle>
          <CardDescription>
            Fyll i formuläret för att göra ändringar på ditt konto
          </CardDescription>
        </CardHeader>{" "}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
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
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" className="font-normal">
              Ändra
            </Button>
          </CardFooter>
        </form>{" "}
      </Card>
    </Form>
  );
}
