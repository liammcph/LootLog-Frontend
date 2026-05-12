import React from 'react';
import { Link } from 'react-router';

import '../Nav/Navbar.css';

const Navbar = ({ user }) => {
  return (
    <nav>
      {user ? (
        <>
          <Link to="/" className="link">Home</Link>
          <p>┃┃</p>
          <Link to="/income" className="link">Income</Link>
          <p>┃┃</p>
          <Link to="/expense" className="link">Expense</Link>
          <p>┃┃</p>
          <Link to="/goal" className="link">Goal</Link>
          <p>┃┃</p>
          <Link to="/sign-up" className="link">Sign-Up</Link>
          <p>┃┃</p>
          <Link to="/sign-in" className="link">Sign-In</Link>
        </>
        ) : (
        <>
          <Link to="/" className="link">Home</Link>
          <p>┃┃</p>
          <Link to="/sign-up" className="link">Sign-Up</Link>
          <p>┃┃</p>
          <Link to="/sign-in" className="link">Sign-In</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar;