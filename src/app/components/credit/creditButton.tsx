// components/CreditButton.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreditButton: React.FC = () => {
  const { data: session } = useSession(); // Get session data
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
      setMessage('Failed  to fetch credits details.');
    }
  };

  const handleClick = async () => {
    if (!session || !session.user?.email) {
      setMessage('User is not authenticated.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const email = session.user.email; // Get user email from session

      const response = await axios.post('/api/update-credits', {
        email,
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

  return (
    <div>
      <p className="mb-2 text-sm text-gray-700">
        {credits !== null ? `Current credits: ${credits}` : 'Fetching credits...'}
      </p>
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {loading ? 'Updating...' : 'Deduct Credit'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default CreditButton;


