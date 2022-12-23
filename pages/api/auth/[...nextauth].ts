import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "IPEHR",
      credentials: {
        userID: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
        console.log(user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            ...user,
            name: credentials?.userID,
          };
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
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT callback invoked", {
        token: token,
        account: account,
        user: user,
        profile: profile,
      });
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = (user as any).access_token;
        token.name = user?.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session callback args", {
        token: token,
        user: user,
      });
      session.user = { name: token.name, email: "", image: "" };
      return {
        ...session,
        accessToken: token.accessToken || "",
      } as unknown as Session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(options);
