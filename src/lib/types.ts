export type ServiceType = {
  _id: string;
  name: string;
  duration: number;
  price: number;
};

export type AppointmentType = {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: ServiceType;
  date: string;
  time: string;
  status: "active" | "cancelled";
};

