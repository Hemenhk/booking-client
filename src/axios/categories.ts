import { Categories } from "@/types/types";
import axios from "axios";

type AllCategories = {
  data: {
    categories: Categories[];
  };
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get<AllCategories>(
      "http://localhost:8001/api/categories"
    );
    return res.data.data.categories;
  } catch (error) {
    console.log(error);
  }
};
