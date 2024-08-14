import axios from "axios";

export const getAvailableDate = async (date: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8001/api/appointments/available-times?startDate=${date}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
