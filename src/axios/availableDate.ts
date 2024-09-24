import axios from "axios";

export const getAvailableDate = async (
  userId: string,
  date: string,
  duration: number
) => {
  try {
    const response = await axios.get(
      `http://localhost:8001/api/appointments/${userId}/available-times?startDate=${date}&duration=${duration}`
    ); // Pass the duration as a query parameter
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
