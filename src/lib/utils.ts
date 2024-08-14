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

export const registerFormFields = [
  {
    name: "storeName",
    type: "text",
    label: "Butikens namn",
    placeholder: "Butikens namn",
  },
  {
    name: "adminName",
    type: "text",
    label: "Admins namn",
    placeholder: "Admins namn",
  },
  {
    name: "adminEmail",
    type: "email",
    label: "Admins Email",
    placeholder: "Admins Email",
  },
  {
    name: "adminPassword",
    type: "password",
    label: "Lösenord",
    placeholder: "Lösenord",
  },
];

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
    placeholder: "Lösenord",
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
