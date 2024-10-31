import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./model/user-model";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
const refreshAccessToken = async (token) => {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
      refreshToken: refreshedTokens?.refresh_token,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  // trustedHosts: ["localhost:3000", "http://localhost:3000/api/auth/session"],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isMatch = bcrypt.compare(
              credentials?.password,
              user?.password
            );

            if (isMatch) {
              return user;
            } else {
              console.log("password mismatch");
              throw new Error("Check your password");
            }
          } else {
            console.log("user not found");
            throw new Error("User not found");
          }
        } catch (error) {}
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     console.log(`JWT ${JSON.stringify(token)}`);
  //     console.log(`User ${JSON.stringify(account)}`);
  //     if (account && user) {
  //       return {
  //         user,
  //         accessToken: account?.access_token,
  //         accessTokenExpires: Date.now() + account?.expires_in * 1000,
  //         refreshToken: account?.refresh_token,
  //       };
  //     }
  //     if (Date.now() < token?.accessTokenExpires) {
  //       return token;
  //     }
  //     return refreshAccessToken(token);
  //   },
  //   async session({ session, token }) {
  //     session.user = token?.user;
  //     session.accessToken = token?.access_token;
  //     session.error = token?.error;

  //     console.log(`Returning Session ${JSON.stringify(session)}`);
  //     return session;
  //   },
  // },
  secret: process.env.NEXT_AUTH_SECRET,
});
