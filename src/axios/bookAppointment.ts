import { AppointmentType } from "@/lib/types";
import { Appointments } from "@/types/types";
import axios from "axios";
import { addDays, format, startOfWeek } from "date-fns";

export const bookAppointment = async (
  userId: string,
  data: AppointmentType
) => {
  try {
    const response = await axios.post(
      `http://localhost:8001/api/appointments/sub-users/${userId}/appointments`,
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
      "http://localhost:8001/api/appointments"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookedAppointmentsForSubuser = async (userId: string) => {
  try {
    const currentDate = new Date();
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    const response = await axios.get<Appointments>(
      `http://localhost:8001/api/appointments/sub-users/${userId}/appointments`,
      {
        params: {
          startDate: format(weekStart, "yyyy-MM-dd"),
          endDate: format(weekEnd, "yyyy-MM-dd"),
        },
      }
    );
    console.log("second", response.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeeklyBookedAppointments = async () => {
  try {
    const currentDate = new Date();
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    const response = await axios.get("http://localhost:8001/api/appointments", {
      params: {
        startDate: format(weekStart, "yyyy-MM-dd"),
        endDate: format(weekEnd, "yyyy-MM-dd"),
      },
    });
    console.log("second", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBookedAppointment = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8001/api/appointments/${id}/cancel`
    );
    console.log("worked!", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
