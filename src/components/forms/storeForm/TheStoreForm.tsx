"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateStore, createStore } from "@/axios/stores";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { registerFormFields } from "@/lib/utils";
import { useState } from "react";
// import { useRouter } from "next/router";

// Validation schema using Zod
const formSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  adminName: z.string().min(2, "Admin name must be at least 2 characters"),
  adminEmail: z.string().email("Invalid email address"),
  adminPassword: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string(),
  service: z.enum(["hår", "skönhet", "massage", "tandvård", "sjukvård"]),
  logo: z.instanceof(File)
});

const services = [
  { value: "hår", name: "Hår" },
  { value: "skönhet", name: "Skönhet" },
  { value: "massage", name: "Massage" },
  { value: "tandvård", name: "Tandvård" },
  { value: "sjukvård", name: "Sjukvård" },
];

export default function TheStoreForm() {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();
  const [logoPreview, setLogoPreview] = useState(null)

  // Setting up the form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      adminName: "",
      adminEmail: "",
      adminPassword: "",
      address: "",
      logo: null
    },
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutateAsync: createStoreMutation } = useMutation({
    mutationFn: (data: CreateStore) => createStore(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["store"], data);
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast({
        title: `Din butik med namnet ${values.storeName} skapades`,
      });
      await createStoreMutation(values);
      setTimeout(() => {
        dismiss()
      }, 2000);
      // console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const mappedFormFields = registerFormFields.map((formField) => (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>{formField.label}</FormLabel> */}
          <FormControl>
            <Input
              className="h-9 rounded-lg"
              placeholder={formField.placeholder}
              type={formField.type}
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
        className="gap-3 mx-auto flex flex-col justify-center w-3/5"
      >
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Registrera ditt konto
        </h2>
        <p className="text-center mb-5 text-sm text-muted-foreground">
          Fyll i formuläret för att registrera ditt konto på Booksy
        </p>
        {mappedFormFields}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Bransch</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Välj en bransch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem value={service.value}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Logo</FormLabel>
          <Input
            type="file"
            className="h-9 cursor-pointer"
            accept="image/*"
            onChange={handleLogoChange}
          />
          {logoPreview && (
            <div className="mt-2">
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="size-40 object-cover rounded-full border"
              />
            </div>
          )}
          <FormMessage />
        </FormItem>
        <Button type="submit" className="font-normal">
          Skapa konto
        </Button>
      </form>
    </Form>
  );
}
