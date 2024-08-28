import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
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
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    error: '/auth/error', // Custom error page
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        throw new Error("User email is required");
      }

      // Check if the user exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
        include: { accounts: true }, // Include the associated accounts
      });

      if (existingUser) {
        // Check if the account's provider is different from any of the existing user's linked accounts
        const existingAccount = existingUser.accounts.find(
          acc => acc.provider === account?.provider
        );

        if (!existingAccount && account) {
          // Link the OAuth account to the existing user
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token ?? undefined,
              expires_at: account.expires_at ?? undefined,
              scope: account.scope ?? undefined,
              token_type: account.token_type ?? undefined,
              id_token: account.id_token ?? undefined,
            },
          });
        }
      } else {
        // If the user does not exist, create a new user with initial credits
        await prisma.user.create({
          data: {
            email: user.email as string,
            name: user.name,
            credits: 10, // Initial credits for new users
            accounts: {
              create: {
                provider: account!.provider,
                providerAccountId: account!.providerAccountId,
                access_token: account!.access_token ?? undefined,
                expires_at: account!.expires_at ?? undefined,
                scope: account!.scope ?? undefined,
                token_type: account!.token_type ?? undefined,
                id_token: account!.id_token ?? undefined,
              },
            },
          },
        });
      }

      return true; // Return true to allow sign-in
    },
  },
};

export default NextAuth(authOptions);
