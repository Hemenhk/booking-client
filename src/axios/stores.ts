import axios from "axios";

export type CreateStore = {
  storeName: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
};

export const createStore = async (data: CreateStore) => {
  try {
    await axios.post("http://localhost:8000/api/stores", data);
  } catch (error) {
    console.log(error);
  }
};
