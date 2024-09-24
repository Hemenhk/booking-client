import axios, { Method } from "axios";
import { getSession } from "next-auth/react";

// Define a generic request function
export const makeRequest = async<T = any, R = any> (
  method: Method,
  url: string,
  data?: T, // Optional data to send in the request body
  params?: any // Optional query parameters to send
): Promise<R> => {
  try {
    // Get session for authorization
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }

    // Make the request
    const res = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json", // Default content type
      },
      data, // Body data (used for POST, PUT requests)
      params, // Query parameters (used for GET, DELETE with filters, etc.)
    });

    console.log("res", res);

    return res.data as R;
  } catch (error: any) {
    console.error(`Error with ${method} request to ${url}:`, error.message);
    throw error;
  }
};
