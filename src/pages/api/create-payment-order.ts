// pages/api/create-payment-order.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    // Create a Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount * 100, // Convert Rs 1 to paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating payment order:', error);
      res.status(500).json({ error: 'Failed to create payment order' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

