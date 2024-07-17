import axios from "axios";

export type ServiceType = {
  _id: string;
  name: string;
  duration: number;
  price: number;
};

export type AppointmentType = {
  _id: string
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: ServiceType;
  date: string;
  time: string;
  status?: string;
};

export const bookAppointment = async (data: AppointmentType) => {
  try {
    const response = await axios.post("http://localhost:8000/api/appointments", data);
    console.log("booked appointment", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookedAppointments = async () => {
  try {
    const response = await axios.get<AppointmentType[]>("http://localhost:8000/api/appointments")
    return response.data
  } catch (error) {
    console.log(error)
  }
}