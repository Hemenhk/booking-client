import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";
import { API_URL } from "./availableDate";

export const getAllUSerBookedAppointments = async (email: string) => {
  const url = `${API_URL}/api/appointments/user/${email}`;
  return makeRequest("GET", url);
};
