import axios from "axios";

export type GetServiceType = {
  _id: string;
  name: string;
  duration: number;
  price: number;
};

export type GetAllServicesType = {
    data: GetServiceType[]
}

export const getAllServices = async () => {
  try {
    const response = await axios.get<GetAllServicesType>("http://localhost:5000/api/services");
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
};
