// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

type User = {
  email: string;
  name: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else if (req.method === 'POST') {
    const { email, name, password }: User = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password are required' });
    }

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password,
          credits: 10, // Default 10 credits for new users
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else if (req.method === 'PATCH') {
    const { email, credits }: { email: string; credits: number } = req.body;

    if (!email || typeof credits !== 'number') {
      return res.status(400).json({ error: 'Invalid data' });
    }

    try {
      const user = await prisma.user.update({
        where: { email },
        data: { credits },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user credits:', error);
      res.status(500).json({ error: 'Failed to update user credits' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

