import axios from "axios";
import { getSession } from "next-auth/react";

export const updateUser = async (userId: string, data: any) => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("User is not authenticated");
    }
    const res = await axios.patch(
      `http://localhost:8001/api/auth/${userId}/profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("store created", res);
    return res.data;
  } catch (error) {
    console.error("Error in createStore:", error);
    throw error;
  }
};
