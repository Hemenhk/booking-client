import { Appointment, Appointments } from "@/types/types";
import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";
import { addDays, format, startOfWeek } from "date-fns";
import { API_URL } from "./availableDate";
import { AppointmentType } from "@/lib/types";

export type CreateAppointment = {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  service: string;
  time: string;
  date: string;
};

export type SingleAppointment = {
  appointment: Appointment
}

export const bookAppointment = async (
  userId: string,
  storeHandle: string,
  data: CreateAppointment
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/appointments/sub-users/${userId}/appointments/${storeHandle}`,
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
    const response = await axios.get<Appointment[]>(
      `${API_URL}/api/appointments`
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
      `${API_URL}/api/appointments/sub-users/${userId}/appointments`,
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
    const response = await axios.get(`${API_URL}/api/appointments`, {
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
      `${API_URL}/api/appointments/${id}/cancel`
    );
    console.log("worked!", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointmentPrice = async (id: string, newPrice: number) => {
  const url = `${API_URL}/api/appointments/${id}/update`;
  makeRequest("PATCH", url, { newPrice });
};

export const getSingleAppointment = async (id: string) => {
  try {
    const res = await axios.get<SingleAppointment>(
      `${API_URL}/api/appointments/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
