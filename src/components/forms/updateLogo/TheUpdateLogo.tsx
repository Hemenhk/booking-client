"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
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
import { Upload } from "lucide-react";
import Image from "next/image";
import placeholder from "../../../../public/placeholder.svg";
import { updateStore } from "@/axios/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getSingleStore } from "@/axios/stores";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  logo: z.instanceof(File).nullable(),
});

export default function TheUpdateLogo() {
  const { data: session } = useSession();
  const { toast, dismiss } = useToast();
  const queryClient = useQueryClient();

  const { data: storeData } = useQuery({
    queryKey: ["store"],
    queryFn: () => getSingleStore(session?.user.store._id),
  });

  console.log("store logo", storeData.logo)

  const [imagePreview, setImagePreview] = useState<string | null>(
    storeData?.logo || null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: null,
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: (data: FormData) => updateStore(session?.user.store._id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (values.logo) {
      formData.append("logo", values.logo);
    }

    try {
      await mutateAsync(formData);
      toast({
        title: `Din logga uppdaterades`,
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
      <Card className="overflow-hidden max-w-[600px]">
        <CardHeader>
          <CardTitle>Lägg till en Logga</CardTitle>
          <CardDescription>
            Spara din butiks logga som visas upp på hemsidan
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid gap-2 w-64">
              <Image
                alt="Store logo"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                src={imagePreview || placeholder}
                width="300"
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="logo-upload"
                      className="flex w-20 aspect-square items-center justify-center rounded-md border border-dashed cursor-pointer"
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" className="font-normal">
              Spara
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
