import NextAuth, { CredentialsSignin, CallbackRouteError } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;

        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!existingUser) {
          throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!isPasswordCorrect)
          throw new Error("Email or Password is not correct");

        const user = {
          name: existingUser.name,
          email: existingUser.email,
          userId: existingUser.id,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
    async session({ session, user }) {
      const guest = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      session.user.userId = guest.id;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
});
