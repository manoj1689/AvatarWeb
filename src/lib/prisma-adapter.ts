import { PrismaClient } from '@prisma/client';
import { PrismaAdapter as DefaultPrismaAdapter } from '@next-auth/prisma-adapter';
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';

const prisma = new PrismaClient();

export const PrismaAdapter = (prismaClient: PrismaClient): Adapter => {
  const defaultAdapter = DefaultPrismaAdapter(prismaClient);

  return {
    ...defaultAdapter,

    // Custom createSession to handle session data with Prisma
    createSession: async (data) => {
      const session = await prisma.session.create({
        data: {
          sessionToken: data.sessionToken,
          userId: String(data.userId), // Ensure userId is a string
          expires: data.expires ? new Date(data.expires) : undefined,
        },
      });

      return {
        ...session,
        userId: String(session.userId), // Convert userId back to string
      };
    },

    // Optional: Override other methods if needed
    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!session) return null;

      const adaptedUser: AdapterUser = {
        ...session.user,
        id: String(session.user.id), // Convert user.id to string
      };

      return {
        session: {
          ...session,
          userId: String(session.userId), // Convert session.userId back to string
        },
        user: adaptedUser,
      };
    },

    async createUser(data) {
      const user = await prisma.user.create({
        data: {
          ...data,
          id: undefined, // Let Prisma auto-generate the id
        },
      });

      return {
        ...user,
        id: String(user.id), // Convert user.id to string
      };
    },

    // Override other adapter methods as necessary
  };
};
