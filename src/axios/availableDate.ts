import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export const getAvailableDate = async (
  userId: string,
  date: string,
  duration: number
) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/appointments/${userId}/available-times?startDate=${date}&duration=${duration}`
    ); // Pass the duration as a query parameter
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
