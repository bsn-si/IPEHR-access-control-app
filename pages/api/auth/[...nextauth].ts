import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "IPEHR",
      credentials: {
        userID: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.externalApiUrl + "user/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            AuthUserId: credentials?.userID || "",
            // EhrSystemId: credentials?.userID || "",
          },
        });
        const user = await res.json();
        // console.log(user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return { ...user, name: credentials?.userID, email: "", image: "" };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = (user as any).access_token;
        token.name = user?.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = { name: token.name, email: "", image: "" };
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(options);
