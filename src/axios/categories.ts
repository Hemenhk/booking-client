import { Categories } from "@/types/types";
import axios from "axios";
import { API_URL } from "./availableDate";

type AllCategories = {
  data: {
    categories: Categories[];
  };
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get<AllCategories>(
      `${API_URL}/api/categories`
    );
    return res.data.data.categories;
  } catch (error) {
    console.log(error);
  }
};
