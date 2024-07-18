import axios from "axios";
import { addDays, format, startOfWeek } from "date-fns";


export type ServiceType = {
  _id: string;
  name: string;
  duration: number;
  price: number;
};

export type AppointmentType = {
  _id: string;
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
    const response = await axios.post(
      "http://localhost:8000/api/appointments",
      data
    );
    console.log("booked appointment", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookedAppointments = async () => {
  try {
    const response = await axios.get<AppointmentType[]>(
      "http://localhost:8000/api/appointments"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeeklyBookedAppointments = async () => {
  try {
    const currentDate = new Date();
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    const response = await axios.get(
      "http://localhost:8000/api/appointments",
      {
        params: {
          startDate: format(weekStart, "yyyy-MM-dd"),
          endDate: format(weekEnd, "yyyy-MM-dd"),
        },
      }
    );
    console.log("second", response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
