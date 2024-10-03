import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

type PersonalInfoProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<
    {
      name: string;
      last_name: string;
      email: string;
      phone_number: string;
      service: string;
      date: string;
      time: string;
      status: string;
    },
    any,
    undefined
  >;
};

const formFields = [
  { name: "name", type: "text", label: "Name", placeholder: "Name" },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    placeholder: "Last Name",
  },
  { name: "email", type: "email", label: "Email", placeholder: "Email" },
  { name: "phone_number", type: "text", label: "Phone", placeholder: "Phone" },
];

export default function ThePersonalInformation({
  form,
  step,
  setStep,
}: PersonalInfoProps) {
  const mappedFormFields = formFields.map((formField) => (
    <FormField
      key={formField.name}
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input
              className="h-9"
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
    <Card className="shadow-md min-w-[700px]">
      <CardHeader>
        <CardTitle>Personuppgifter</CardTitle>
        <CardDescription>
          Fyll i formuläret för att boka din tid.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 w-3/4">{mappedFormFields}</CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button
          type="submit"
          className="font-normal"
        >
          Boka
        </Button>
      </CardFooter>
    </Card>
  );
}
