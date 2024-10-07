import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";

export type Feedback = {
  store: string;
  title: string;
  message: string;
  adminId: string;
};

export const createFeedback = async (storeId: string, data: Feedback) => {
  const url = `http://localhost:8001/api/feedback/${storeId}/feedback`;
  return makeRequest("POST", url, data);
};
