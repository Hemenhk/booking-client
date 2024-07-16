import axios from "axios";

export const getAvailableDate = async (date: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/appointments/available-times?date=${date}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
