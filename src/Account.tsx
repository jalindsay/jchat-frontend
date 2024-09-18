import React from 'react';
import { useAuth } from './AuthContext';

const Account: React.FC = () => {
  const { getUsername } = useAuth();
  const username = getUsername();

  return (
    <div>
      <h1>Account</h1>
      {username ? <p>Welcome, {username}!</p> : <p>No user logged in.</p>}
    </div>
  );
};

export default Account;
