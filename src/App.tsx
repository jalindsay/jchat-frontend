import { Fragment } from 'react/jsx-runtime';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Users from './Users';
import Home from './Home';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
