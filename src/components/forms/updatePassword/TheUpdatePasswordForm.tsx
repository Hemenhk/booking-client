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

import { PasswordsType, updateUserPassword } from "@/axios/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

type Props = {
  userId: string;
};

export default function TheUpdatePasswordForm({ userId }: Props) {
  const queryClient = useQueryClient();
  const { toast, dismiss } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: PasswordsType) => updateUserPassword(userId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync(values);
      toast({
        title: `Lösenorden ändrades!`,
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
          <CardTitle>Ändra Lösenord</CardTitle>
          <CardDescription>
            Fyll i fälten för att ändra ditt lösenord
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gamla lösenordet</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Detta är ditt gamla lösenord
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nya lösenordet</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Detta är ditt nya lösenord</FormDescription>
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
