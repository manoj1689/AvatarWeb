// pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;

    // Verify payment signature using the static method
    const isValid = Razorpay.validateWebhookSignature(
      `${razorpay_order_id}|${razorpay_payment_id}`,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET!
    );

    if (!isValid) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    try {
      // Update user's credits after successful payment
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { credits: { increment: 10 } }, // Add 10 credits
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
