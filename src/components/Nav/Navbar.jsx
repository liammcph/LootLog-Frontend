import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/income">Income</Link>
      <Link to="/expense">Expense</Link>
      <Link to="/goal">Goal</Link>
      <Link to="/sign-up">Sign-Up</Link>
      <Link to="/sign-in">Sign-In</Link>
    </nav>
  )
}

export default Navbar;