import axios from "axios";
import { getSession } from "next-auth/react";

export type CreateStore = {
  storeName: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
};

export type CreateSubUser = {
  name: string;
  email: string;
  password: string;
};

export type SingleStore = {
  sub_users: string;
  admin: string;
  _id: string;
  name: string;
  email: string;
};

export const getSingleStore = async (storeId: string) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }
    const res = await axios.get<SingleStore>(
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
