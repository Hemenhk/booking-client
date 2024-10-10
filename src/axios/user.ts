import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";
import { getSession } from "next-auth/react";
import { API_URL } from "./availableDate";

export type PasswordsType = {
  oldPassword: string;
  newPassword: string;
};

export type CreateUser = {
  name: string
  email: string;
  password: string;
};

export const updateUser = async (userId: string, data: any) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }
    const res = await axios.patch(
      `${API_URL}/api/auth/${userId}/profile`,

      data,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("store created", res);
    return res.data;
  } catch (error) {
    console.error("Error in createStore:", error);
    throw error;
  }
};

export const updateStandardUserPassword = async (
  userId: string,
  data: PasswordsType
) => {
  const url = `${API_URL}/api/auth/${userId}/standard-user/profile/change-password`;
  return makeRequest("PATCH", url, data);
};

export const updateUserPassword = async (
  userId: string,
  data: PasswordsType
) => {
  const url = `${API_URL}/api/auth/${userId}/profile/change-password`;
  return makeRequest("PATCH", url, data);
};

export const createUser = async (data: CreateUser) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/auth/register`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
