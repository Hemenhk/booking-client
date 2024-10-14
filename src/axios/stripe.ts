import axios from "axios";
import { API_URL } from "./availableDate"; // Adjust the import path if needed

// Create checkout session function
export const createCheckout = async (priceId: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/stores/create-checkout`, // Replace with your actual backend route
      { priceId }
    );

    return res.data; // Assuming response contains the sessionId
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error; // Propagate the error to handle it in the calling code
  }
};
