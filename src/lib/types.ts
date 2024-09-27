import { Service } from "@/types/types";

export type ServiceType = {
  _id: string;
  name: string;
  duration: number;
  price: number;
  bgColor: string
};

export type AppointmentType = {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: Service;
  date: string;
  time: string;
  status: "active" | "cancelled";
};

