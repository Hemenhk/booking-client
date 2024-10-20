import axios from "axios";
import { API_URL } from "./availableDate";

export type CreateReview = {
  review?: string;
  reviewer?: string;
  rating?: number;
  store?: string;
};

export const createReview = async (data: CreateReview) => {
  try {
    const res = await axios.post(`${API_URL}/api/reviews`, data);
    console.log("Created review", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
