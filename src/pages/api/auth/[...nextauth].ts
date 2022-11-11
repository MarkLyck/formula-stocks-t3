import NextAuth, { type NextAuthOptions } from "next-auth";
// import Auth0Provider from "next-auth/providers/auth0";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

// import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, token, user }) {
      if (session.user && user?.id) {
        session.user.id = user.id;
      } else if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Missing email");
        }
        if (!credentials?.password) {
          throw new Error("Missing password");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
          select: {
            email: true,
            password: true,
            id: true,
          },
        });

        if (!user || user.password !== credentials.password) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
