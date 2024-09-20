export type User = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
};

export type Service = {
  _id: string;
  name: string;
  duration: number;
  price: number;
  createdBy: User;
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

export type AdminUser = {
  services: Service[];
  appointments: Appointment[];
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  role: "store_admin";
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

export type Review = {
  _id: string;
  isVerified: boolean;
  reviewer: string;
  review: string;
  rating: number;
  createdAt: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

export type OpeningHours = {
  monday: { open: string; close: string; closed: boolean };
  tuesday: { open: string; close: string; closed: boolean };
  wednesday: { open: string; close: string; closed: boolean };
  thursday: { open: string; close: string; closed: boolean };
  friday: { open: string; close: string; closed: boolean };
  saturday: { open: string; close: string; closed: boolean };
  sunday: { open: string; close: string; closed: boolean };
};

export type TotalReviewArray = {
  stars: number;
  count: number;
};

export type Store = {
  _id: string;
  name: string;
  handle: string;
  address: string;
  address_coordinates: Coordinates;
  service: "hår" | "skönhet" | "massage" | "tandvård" | "sjukvård";
  phone_number: string;
  opening_hours: OpeningHours[];
  description: string;
  reviews: Review[];
  totalReviews: number;
  sumReviews: number;
  averageRating: number;
  sub_users: SubUser[];
  admin: AdminUser;
  logo: string;
  totalReviewsArray: TotalReviewArray[];
};

export type StoresResponse = {
  stores: Store[];
  message: string;
};
