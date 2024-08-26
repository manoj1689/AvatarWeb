// pages/api/get-credits.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const email = req.query.email as string;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { credits: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ credits: user.credits });
    } catch (error) {
      console.error('Error fetching user credits:', error);
      res.status(500).json({ error: 'Failed to fetch credits' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
