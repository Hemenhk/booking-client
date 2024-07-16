import { UseFormReturn } from "react-hook-form";
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

type PersonalInfoProps = {
  form: UseFormReturn<
    {
      name: string;
      last_name: string
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
  { name: "last_name", type: "text", label: "Last Name", placeholder: "Last Name" },
  { name: "email", type: "email", label: "Email", placeholder: "Email" },
  { name: "phone_number", type: "text", label: "Phone", placeholder: "Phone" },
];

export default function PersonalInformation({ form }: PersonalInfoProps) {
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
  return <>{mappedFormFields}</>;
}
