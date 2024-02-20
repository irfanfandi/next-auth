import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    id: number; // <- here it is
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Sign in",
      type: "credentials",
      credentials: {
        usernameOrEmail: {
          label: "Email or Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.usernameOrEmail || !credentials.password) {
          return null;
        }

        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/login-api/login`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              usernameOrEmail: credentials.usernameOrEmail,
              password: credentials.password,
            }),
            cache: "no-cache",
            headers: { "Content-Type": "application/json" },
          }
        );
        const ress = await user.json();
        if (!ress?.success) {
          return null;
        }

        return {
          id: ress.user.id,
          guid: ress.user.guid,
          user_name: ress.user.user_name,
          email: ress.user.email,
          randomKey: "Random",
        };
      },
    }),
  ],
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    session: ({ session, token }: any) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }: any) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
