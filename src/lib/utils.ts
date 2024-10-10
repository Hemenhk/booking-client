import { compare } from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const passwordIsValid = await compare(password, hashedPassword);
  return passwordIsValid;
}

export const signinFormFields: Array<{
  name: "email" | "password";
  label: string;
  type: string;
  placeholder?: string;
}> = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Lösenord",
  },
];

export const registerFormFields: Array<{
  name: "name" | "email" | "password" | "confirmPassword";
  label: string;
  type: string;
  placeholder?: string;
}> = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "name",
    type: "text",
    label: "Namn",
    placeholder: "Namn",
  },
  {
    name: "password",
    type: "password",
    label: "Lösenord",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Bekräfta Lösenord",
  },
];

export const subUserFormFields: Array<{
  name: "name" | "email" | "password";
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    name: "name",
    type: "text",
    label: "Namn",
    placeholder: "Namn",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Lösenord",
    placeholder: "Lösenord",
  },
];

export const serviceFormFields: Array<{
  name: "name" | "duration" | "price" | "bgColor";
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    name: "name",
    type: "text",
    label: "Namn",
    placeholder: "Namn",
  },
  {
    name: "duration",
    type: "number",
    label: "Tid",
    placeholder: "Tid",
  },
  {
    name: "price",
    type: "number",
    label: "Pris (kr)",
    placeholder: "Pris",
  },
];

export const contactFormFields: Array<{
  name: "title" | "name" | "email" | "phone_number";
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    name: "title",
    type: "text",
    label: "Ämne",
    placeholder: "Ämne",
  },
  {
    name: "name",
    type: "text",
    label: "Namn",
    placeholder: "Namn",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "phone_number",
    type: "text",
    label: "Telefonnummer",
    placeholder: "123 456789",
  },
];

export const mediaFormFields: Array<{
  name: "tiktok" | "youtube" | "instagram" | "facebook" | "x";
  label: string;
  type: string;
}> = [
  {
    name: "tiktok",
    type: "text",
    label: "Tiktok",
  },
  {
    name: "youtube",
    type: "text",
    label: "Youtube",
  },
  {
    name: "instagram",
    type: "text",
    label: "Instagram",
  },
  {
    name: "facebook",
    type: "text",
    label: "Facebook",
  },
  {
    name: "x",
    type: "text",
    label: "X",
  },
];
