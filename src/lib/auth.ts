import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    guid: string;
    id: any;
    user_name: string;
    passwd: string;
    email: string;
    full_name: string;
    user_status: number;
    phone_id: string;
    register_date: string;
    branch_id: string;
    is_new_task: number;
    activkey: string;
    parent_alias_id: string;
    company_id: number;
    auth_key: string;
    expired_key: string;
    deleted_by: number;
    deleted_stamp: string;
    _history: string;
  }
}
let userDataGoogle: any;

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
          ...ress.user,
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
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/login-api/get-logged-in-google`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              email: profile.email,
            }),
            cache: "no-cache",
            headers: { "Content-Type": "application/json" },
          }
        );
        const ress = await user.json();
        if (!ress?.success) {
          return false;
        }
        userDataGoogle = {
          ...ress.user,
          randomKey: "Random",
        };
        return {
          ...ress.user,
          randomKey: "Random",
        };
      }
      return true;
    },
    session: ({ session, token }: any) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
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
          ...u,
          ...userDataGoogle,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
