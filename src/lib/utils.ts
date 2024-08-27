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

export const signinFormFields = [
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

export const subUserFormFields = [
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

export const serviceFormFields = [
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
    label: "Pris",
    placeholder: "Pris",
  },
];
