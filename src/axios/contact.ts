import axios from "axios";

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
      "http://localhost:8001/api/contact"
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (data: Contact) => {
  try {
    const res = await axios.post("http://localhost:8001/api/contact", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
