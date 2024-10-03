import {
  Appointment,
  OpeningHours,
  Store,
  StoresResponse,
  SubUser,
} from "@/types/types";
import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";
import { getSession } from "next-auth/react";

export type CreateStore = {
  storeName: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  address: string;
  logo: File;
  service: "hår" | "skönhet" | "massage" | "tandvård" | "sjukvård";
};

export type CreateSubUser = {
  name: string;
  email: string;
  password: string;
};

export type StoreData = {
  store: Store;
  storeAppointments: Appointment[];
  monthlyTotalIncome: number;
};

export type StoreByName = {
  data: StoreData;
};

export const getAllStores = async () => {
  try {
    const res = await axios.get<StoresResponse>(
      "http://localhost:8001/api/stores/"
    );
    return res.data.stores;
  } catch (error) {
    console.log(error);
  }
};

// export const getSingleStore = async (storeId: string) => {
//   try {
//     const session = await getSession();

//     if (!session || !session.user) {
//       throw new Error("User is not authenticated");
//     }
//     const res = await axios.get<Store>(
//       `http://localhost:8001/api/stores/${storeId}`,
//       {
//         headers: { Authorization: `Bearer ${session.user.accessToken}` },
//       }
//     );
//     return res.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getSingleStore = async (storeId: string) => {
  const url = `http://localhost:8001/api/stores/${storeId}`;
  return makeRequest("GET", url);
};

export const getSingleStoreDetail = async (
  storeHandle: string,
  year?: number,
  month?: number
) => {
  try {
    const params = new URLSearchParams();
    if (year) params.append("year", year.toString());
    if (month) params.append("month", month.toString());

    const res = await axios.get<StoreByName>(
      `http://localhost:8001/api/stores/name/${storeHandle}?${params.toString()}`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createStore = async (formData) => {
  try {
    const res = await axios.post("http://localhost:8001/api/stores", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("store created", res);
    return res.data;
  } catch (error) {
    console.error("Error in createStore:", error);
    throw error;
  }
};

export const createSubUser = async (storeId: string, data: CreateSubUser) => {
  const url = `http://localhost:8001/api/stores/${storeId}/subuser`;
  return makeRequest("POST", url, data);
};

export const deleteSubUser = async (storeId: string, userId: string) => {
  const url = `http://localhost:8001/api/stores/${storeId}/subuser/${userId}`;
  return makeRequest("DELETE", url);
};

export const updateOpeningHours = async (
  storeId: string,
  openingHours: OpeningHours
) => {
  const url = `http://localhost:8001/api/stores/${storeId}/opening-hours`;
  return makeRequest("PATCH", url, { opening_hours: openingHours });
};

export const updateStore = async (storeId: string, data: Store) => {
  const url = `http://localhost:8001/api/stores/${storeId}`;
  return makeRequest("PATCH", url, { data });
};

export const getSubscriptionCustomer = async (customerId: string) => {
  const url = `http://localhost:8001/api/stores/subscription/${customerId}`;
  return makeRequest("GET", url);
};

export const updateStoreImages = async (storeId: string, data: any) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }
    const res = await axios.patch(
      `http://localhost:8001/api/stores/${storeId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error in createStore:", error);
    throw error;
  }
};
