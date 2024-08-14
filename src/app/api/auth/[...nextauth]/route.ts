import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

type User = {
  id: string;
  email: string;
  role?: "store_admin" | "sub_user";
  store: string;
  accessToken: string;
};

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials) {
          throw new Error("Credentials are missing");
        }

        const { email, password } = credentials as any;

        try {
          // Replace with your local server endpoint
          const response = await axios.post(
            "http://localhost:8001/api/auth/login",
            {
              email,
              password,
            }
          );

          const user = response.data;

          if (user) {
            return {
              id: user._id as string,
              email: user.email,
              role: user.role,
              store: user.store ? user.store.toString() : undefined,
              accessToken: user.accessToken,
            };
          }
        } catch (error) {
          console.error("Error logging in:", error);
          throw new Error("Invalid credentials");
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      return { ...token, ...user };
      // if (user) {
      //   return {
      //     ...token,
      //     id: user.id,
      //     role: user.role,
      //     store: user.store,
      //   };
      // }
      // return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.id as string,
      //     role: token.role as string,
      //     store: token.store as string,
      //   },
      // };
    },
  },
  //   secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
