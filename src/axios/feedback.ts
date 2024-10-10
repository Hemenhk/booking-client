import { makeRequest } from "@/utils/makeRequest";
import { API_URL } from "./availableDate";

export type Feedback = {
  store: string;
  title: string;
  message: string;
  adminId: string;
};

export const createFeedback = async (storeId: string, data: Feedback) => {
  const url = `${API_URL}/api/feedback/${storeId}/feedback`;
  return makeRequest("POST", url, data);
};
