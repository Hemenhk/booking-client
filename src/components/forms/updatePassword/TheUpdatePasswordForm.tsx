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
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import {
  PasswordsType,
  updateStandardUserPassword,
  updateUserPassword,
} from "@/axios/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

type Props = {
  userId: string;
};

export default function TheUpdatePasswordForm({ userId }: Props) {
  const { data: session } = useSession();
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
    mutationFn: (data: PasswordsType) => {
      // Check the user's role from the session
      if (session?.user.role !== "user") {
        // If the role is not "user", it's a store admin or sub-user
        return updateUserPassword(userId, data);
      }
      // Otherwise, it's a standard user
      return updateStandardUserPassword(userId, data);
    },
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
      <DialogContent className="overflow-hidden max-w-[600px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ändra Lösenord
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Fyll i fälten för att ändra ditt lösenord
            </p>
          </DialogHeader>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gamla lösenordet</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>Detta är ditt gamla lösenord</FormDescription>
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
