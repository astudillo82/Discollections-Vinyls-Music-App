/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
  <div>
    <h1>AUTHENTICATE USER</h1>
    <form>
      <div>
        <label htmlFor="email">EMAIL</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">PASSWORD</label>
        <input type="password" id="password" />
      </div>
    </form>
    <button type="button">ENTER</button>
    <Link to="/">
      <button type="button">GO BACK</button>
    </Link>
  </div>
);

export default Login;
