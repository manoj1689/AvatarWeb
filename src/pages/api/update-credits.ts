// pages/api/update-credits.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, credits } = req.body;

    if (typeof credits !== 'number') {
      return res.status(400).json({ error: 'Invalid credits value' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.credits + credits < 0) {
        return res.status(400).json({ error: 'Not enough credits' });
      }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: { credits: user.credits + credits },
      });

      res.status(200).json({ credits: updatedUser.credits });
    } catch (error) {
      console.error('Error updating credits:', error);
      res.status(500).json({ error: 'Failed to update credits' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
