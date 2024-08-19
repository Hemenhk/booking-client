import NextAuth from "next-auth/next";
import { Store } from "./types";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      role: "store_admin" | "sub_user";
      store: Store;
      accessToken: string;
    };
  }
}
