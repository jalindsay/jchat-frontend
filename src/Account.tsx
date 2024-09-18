import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Account: React.FC = () => {
  const { getUserId, getAuthToken } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = getUserId();
      const token = getAuthToken();
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3000/user/${userId}`, {
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
  }, [getUserId]);

  return (
    <div>
      <h1>Account</h1>
      {username ? <p>Welcome, {username}!</p> : <p>No user logged in.</p>}
    </div>
  );
};

export default Account;
