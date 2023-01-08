import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";

async function refreshAccessToken(
  token: { access_token: string; refresh_token: string },
  userId: string
) {
  try {
    const res = await fetch(process.env.externalApiUrl + "user/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // AuthUserId: userId,
        Authorization: `Bearer ${token}`,
      },
    });
    const refresh = await res.json();

    if (!res.ok) {
      throw refresh;
    }

    return {
      ...token,
      accessToken: refresh.access_token,
      accessTokenExpires: Date.now() + 900000,
      refreshToken: refresh.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "IPEHR",
      credentials: {
        userID: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("AUTH CALLED");
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
        console.log("111", res);
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
      if (account) {
        token.accessToken = (user as any).access_token;
        token.name = user?.name;
        token.refreshToken = (user as any).refresh_token;
        token.accessTokenExpires = Date.now() + 900000;

        return token;
      }

      if (Date.now() < Number(token.accessTokenExpires)) {
        return token;
      }

      return refreshAccessToken(
        (user as any).access_token,
        (user as any).refresh_token
      );
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
