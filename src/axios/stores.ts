import { Store, StoresResponse, SubUser } from "@/types/types";
import axios from "axios";
import { getSession } from "next-auth/react";

export type CreateStore = {
  storeName: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  address: string;
  service: "hår" | "skönhet" | "massage" | "tandvård" | "sjukvård";
};

export type CreateSubUser = {
  name: string;
  email: string;
  password: string;
};

export type StoreByName = {
  data: Store
}

export const getAllStores = async () => {
  try {
    const res = await axios.get<StoresResponse>(
      "http://localhost:8001/api/stores/"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleStore = async (storeId: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }
    const res = await axios.get<Store>(
      `http://localhost:8001/api/stores/${storeId}`,
      {
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleStoreDetail = async (storeName: string) => {
  try {
    const res = await axios.get<StoreByName>(
      `http://localhost:8001/api/stores/name/${storeName}`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createStore = async (data: CreateStore) => {
  try {
    await axios.post("http://localhost:8001/api/stores", data);
  } catch (error) {
    console.log(error);
  }
};

export const createSubUser = async (storeId: string, data: CreateSubUser) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }

    await axios.post(
      `http://localhost:8001/api/stores/${storeId}/subuser`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
