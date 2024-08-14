import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      role: "store_admin" | "sub_user";
      store: string;
      accessToken: string;
    };
  }
}
