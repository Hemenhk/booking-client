export type Service = {
  _id: string;
  name: string;
  duration: number;
  price: number;
  createdBy: string;
};

export type Appointment = {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: Service;
  date: string;
  time: string;
  status: "active" | "cancelled";
  createdBy: string;
};

export type Appointments = {
  data: Appointment[];
};

export type SubUser = {
  services: Service[];
  appointments: Appointment[];
  _id: string;
  name: string;
  email: string;
  role: "sub_user";
  profileImage: string;
};

export type Admin = {
  _id: string;
  name: string;
  email: string;
  role: "store_admin";
};

export type Review = {
  reviewer: string;
  review: string;
  rating: number;
  createdAt: string;
};

export type Store = {
  _id: string;
  name: string;
  handle: string;
  address: string;
  service: "hår" | "skönhet" | "massage" | "tandvård" | "sjukvård";
  opening_hours: string;
  reviews: Review[];
  totalReviews: number;
  sumReviews: number;
  averageRating: number;
  sub_users: SubUser[];
  admin: Admin | null;
  logo: string;
};

export type StoresResponse = {
  stores: Store[];
  message: string;
};
