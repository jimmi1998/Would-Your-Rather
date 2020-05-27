import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => (
  <div className="nav">
    <Link to='/'>Home</Link>
    <Link to='/add'>New Question</Link>
    <Link to='/leaderboard'>Leaderboard</Link>
  </div>
);

export default Nav;
