import axios from "axios";
import { string } from "zod";

export type AppointmentType = {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: string;
  date: string;
  time: string;
  status?: string;
};

export const bookAppointment = async (data: AppointmentType) => {
  try {
    const response = await axios.post("http://localhost:5000/api/appointments", data);
    console.log("booked appointment", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
