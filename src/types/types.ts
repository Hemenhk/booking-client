export type User = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  store: Store;
};

export type Service = {
  _id: string;
  name?: string;
  duration?: number;
  price?: number;
  createdBy?: User;
  bgColor?: string;
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
  createdBy: User;
};

export type Categories =
  | "frisör"
  | "barberare"
  | "massage"
  | "hudvård"
  | "nagelsalong"
  | "makeup & styling"
  | "fransar & bryn"
  | "spa & avkoppling"
  | "hårborttagning"
  | "sjukgymnastik"
  | "kiropraktor"
  | "akupunktur"
  | "zonterapi"
  | "tandblekning"
  | "personlig träning"
  | "kostrådgivning"
  | "manikyr & pedikyr"
  | "ansiktsbehandling"
  | "botox & fillers"
  | "alternativ medicin";

export type UserAppointments = {
  appointments: Appointment[];
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
  monday: {
    open: string;
    break: string;
    breakOver: string;
    close: string;
    closed: boolean;
  };
  tuesday: {
    open: string;
    break: string;
    breakOver: string;
    close: string;
    closed: boolean;
  };
  wednesday: {
    open: string;
    break: string;
    breakOver: string;
    close: string;
    closed: boolean;
  };
  thursday: {
    open: string;
    break: string;
    breakOver: string;
    close: string;
    closed: boolean;
  };
  friday: {
    open: string;
    break: string;
    breakOver: string;
    close: string;
    closed: boolean;
  };
  saturday: {
    open: string;
    break: string;
    breakOver: string;
    close: string;
    closed: boolean;
  };
  sunday: {
    open: string;
    break: string;
    breakOver: string;
    close: string;
    closed: boolean;
  };
};

export type TotalReviewArray = {
  stars: number;
  count: number;
};

export type Media = {
  tiktok?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  x?: string;
};

export type Store = {
  _id: string;
  social_media: Media;
  name: string;
  handle: string;
  hasAccess: boolean;
  address: string;
  city: string;
  country: string;
  categories: Categories[];
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
  collageImages: string[];
  customerId: string;
  commitmentPeriod: number;
  totalIncome: number;
};

export type StoresResponse = {
  stores: Store[];
  message: string;
};
