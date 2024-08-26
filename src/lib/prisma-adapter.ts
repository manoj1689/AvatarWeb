import { PrismaClient } from '@prisma/client';
import { Adapter, AdapterUser, AdapterSession } from 'next-auth/adapters';

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    // Other adapter methods

    async createSession(data) {
      const session = await prisma.session.create({
        data: {
          sessionToken: data.sessionToken,
          userId: Number(data.userId), // Assuming userId comes as a string, we convert it back to number for storage
          expires: data.expires,
        },
      });
      return {
        ...session,
        userId: String(session.userId), // Convert userId back to string
      };
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!session) return null;
      const { user } = session;
      return {
        session: {
          ...session,
          userId: String(session.userId), // Convert userId back to string
        },
        user: user as AdapterUser,
      };
    },

    // Other adapter methods
  };
}
