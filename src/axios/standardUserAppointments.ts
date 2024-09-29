import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";

export const getAllUSerBookedAppointments = async (email: string) => {
  const url = `http://localhost:8001/api/appointments/user/${email}`;
  return makeRequest("GET", url);
};
