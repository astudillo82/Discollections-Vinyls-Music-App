/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logInUser } from '../logic/AuthUser';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empties, setEmpties] = useState('');

  const history = useHistory();

  const submittedForm = async (e) => {
    e.preventDefault();
    setEmpties('');

    if (!email || !password) {
      setEmpties('Please complete the fields');
      return;
    }

    const result = await logInUser(email, password);
    return result.correct ? history.push('/home') : setEmpties('incorrect username and/or password.');
  };

  return (
    <div className="login">
      <header>
        <h1 className="register-title">LOGIN USER</h1>
        <p className="register-subtitle">Please fill in this form to login.</p>
      </header>

      <form className="login-form" onSubmit={submittedForm}>
        <div className="login-email">
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className="login-password">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </form>
      
      <div className="buttons"></div>
        <button className="login-button" type="submit">LOG IN</button>
        <Link to="/">
          <button className="go_back button" type="button">GO BACK</button>
        </Link>
      {empties !== '' && <span>{empties}</span>}
    </div>
  );
};

export default Login;
