import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Update the path if necessary
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // or "database" if you prefer storing sessions in the database
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    error: '/auth/This error link working', // Custom error page
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        throw new Error("User email is required");
      }

      // Check if the user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      // If the user does not exist, create a new user with initial credits
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email as string,
            name: user.name,
            credits: 10, // Initial credits for new users
          },
        });
      }

      return true; // Return true to allow sign-in
    },
  },
};

export default NextAuth(authOptions);
