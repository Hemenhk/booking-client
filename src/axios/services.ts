import axios from "axios";
import { getSession } from "next-auth/react";

export type GetServiceType = {
  _id: string;
  name: string;
  duration: number;
  price: number;
};

export type CreateServiceType = {
  name: string;
  duration: number;
  price: number;
};

export type GetAllServicesType = {
  data: GetServiceType[];
};

export const getAllServices = async () => {
  try {
    const response = await axios.get<GetAllServicesType>(
      "http://localhost:8001/api/services"
    );
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const createSerive = async (userId: string, data: CreateServiceType) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }
   const res = await axios.post<GetAllServicesType>(
      `http://localhost:8001/api/sub-users/${userId}/services`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    console.log("res back", res)
  } catch (error: any) {
    console.log(error);
  }
};
