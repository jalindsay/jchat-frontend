import React from 'react';
import { render, screen } from '@testing-library/react';
import Account from '../src/Account';
import { AuthProvider, AuthContext } from '../src/AuthContext';

// Mock the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ username: 'testuser' }),
  }),
) as jest.Mock;

// Mock local storage
beforeEach(() => {
  localStorage.setItem('authToken', 'fake-token');
  localStorage.setItem('userId', '123');
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks(); // Clear all mocks after each test
});

const mockAuthContext = {
  isAuthenticated: () => true,
  getAuthToken: () => 'fake-token',
  getUsername: () => 'testuser',
  getUserId: () => '123',
  login: jest.fn(),
  logout: jest.fn(),
};

test('renders Account component with username', async () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <Account />
    </AuthContext.Provider>,
  );

  // Wait for the username to be displayed
  const usernameElement = await screen.findByText(/Welcome, testuser!/i);
  expect(usernameElement).toBeInTheDocument();
});

test('renders Account component with no user logged in', async () => {
  // Mock fetch to return an error
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
    }),
  );

  render(
    <AuthContext.Provider value={mockAuthContext}>
      <Account />
    </AuthContext.Provider>,
  );

  // Wait for the "No user logged in" message
  const noUserElement = await screen.findByText(/No user logged in./i);
  expect(noUserElement).toBeInTheDocument();
});
