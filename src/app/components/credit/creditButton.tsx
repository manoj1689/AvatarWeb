// components/CreditButton.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { loadRazorpayScript } from '../../../utils/razorpay'; // Utility to load Razorpay script

const CreditButton: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (session && session.user?.email) {
      fetchCredits(session.user.email);
    }
  }, [session]);

  const fetchCredits = async (email: string) => {
    try {
      const response = await axios.get('/api/get-credits', { params: { email } });
      setCredits(response.data.credits);
    } catch (error) {
      console.error('Error fetching credits:', error);
      setMessage('Failed to fetch credits details.');
    }
  };

  const handleDeductCredit = async () => {
    if (!session || !session.user?.email) {
      setMessage('User is not authenticated.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('/api/update-credits', {
        email: session.user.email,
        credits: -1, // Deduct 1 credit
      });

      setCredits(response.data.credits);
      setMessage(`Credits updated! Remaining credits: ${response.data.credits}`);
    } catch (error) {
      console.error('Error updating credits:', error);
      setMessage('Failed to update credits.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCredit = async () => {
    if (!session || !session.user?.email) {
      setMessage('User is not authenticated.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        setMessage('Razorpay SDK failed to load.');
        return;
      }

      // Create a payment order
      const orderResponse = await axios.post('/api/create-payment-order', { amount: 1 });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: 'Your Company',
        description: 'Add Credits',
        order_id: orderResponse.data.id,
        handler: async (response: any) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email: session.user?.email,
          };

          // Verify payment
          const verifyResponse = await axios.post('/api/verify-payment', paymentData);

          // Update credits state
          setCredits(verifyResponse.data.credits);
          setMessage(`Credits added! New balance: ${verifyResponse.data.credits}`);
        },
        prefill: {
          email: session.user.email,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      setMessage('Failed to process payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm text-gray-700">
        {credits !== null ? `Current credits: ${credits}` : 'Fetching credits...'}
      </p>
      {credits === 0 ? (
        <button
          onClick={handleAddCredit}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          {loading ? 'Processing...' : 'Buy 10 Credits for Rs 1'}
        </button>
      ) : (
        <button
          onClick={handleDeductCredit}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {loading ? 'Updating...' : 'Deduct Credit'}
        </button>
      )}
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default CreditButton;





