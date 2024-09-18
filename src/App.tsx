import { Fragment } from 'react/jsx-runtime';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './Users';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import Account from './Account';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </AuthProvider>
  );
}

export default App;
