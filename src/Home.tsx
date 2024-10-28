import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './Home.css';

const host = process.env.BACKEND_HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000');

const Home: React.FC = () => {
  const [username, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const { login } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${host}:${port}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: loginPassword }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Assuming the response contains a token
      login(data.token, data.user);
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle create user logic here
    console.log('Create User:', { email: createEmail, password: createPassword });
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setLoginUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        <h2>Create User</h2>
        <form onSubmit={handleCreateSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
