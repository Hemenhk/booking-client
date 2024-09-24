import { Service } from "@/types/types";
import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";

export type CreateServiceType = {
  name: string;
  duration: number;
  price: number;
};

export type GetAllServicesType = {
  data: Service[];
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

export const getServicesForSubUser = async (userId: string) => {
  try {
    const res = await axios.get<GetAllServicesType>(
      `http://localhost:8001/api/sub-users/${userId}/services`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (
  userId: string,
  serviceData: CreateServiceType
) => {
  const url = `http://localhost:8001/api/sub-users/${userId}/services`;
  return makeRequest("POST", url, serviceData);
};

export const deleteService = async (userId: string, serviceId: string) => {
  const url = `http://localhost:8001/api/sub-users/${userId}/services/${serviceId}`;
  return makeRequest("DELETE", url);
};
