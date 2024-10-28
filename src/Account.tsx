import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const host = process.env.BACKEND_HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000');

const Account: React.FC = () => {
  const { getUserId, getAuthToken } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserId();
      const token = getAuthToken();
      if (userId) {
        try {
          const response = await fetch(`http://${host}:${port}/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }

          const data = await response.json();
          setUsername(data.username);
          console.log('User:', data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [getUserId, getAuthToken]);

  return (
    <div>
      <h1>Account</h1>
      {username ? <p>Welcome, {username}!</p> : <p>No user logged in.</p>}
    </div>
  );
};

export default Account;
