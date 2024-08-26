import { PrismaClient } from '@prisma/client';
import { PrismaAdapter as DefaultPrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export const PrismaAdapter = (prismaClient) => {
  const defaultAdapter = DefaultPrismaAdapter(prismaClient);

  return {
    ...defaultAdapter,
    createSession: async (data) => {
      return prisma.session.create({
        data: {
          sessionToken: data.sessionToken,
          userId: data.userId,
          expires: data.expires ? new Date(data.expires) : undefined,
        },
      });
    },
  };
};
