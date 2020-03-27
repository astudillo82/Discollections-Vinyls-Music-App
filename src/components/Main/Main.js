import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/Login">Log In</Link></li>
    </div>
  );
};

export default Main;
