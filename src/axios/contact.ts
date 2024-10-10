import axios from "axios";
import { API_URL } from "./availableDate";

export type Contact = {
  title?: string;
  message?: string;
  name: string;
  email: string;
  phone_number?: string;
};

export type AllContact = {
  data: Contact[];
};

export const getAllQuestions = async () => {
  try {
    const res = await axios.get<AllContact>(
      `${API_URL}/api/contact`
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (data: Contact) => {
  try {
    const res = await axios.post(`${API_URL}/api/contact`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
