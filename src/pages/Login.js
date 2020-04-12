/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logInUser } from '../logic/AuthUser';
import LoginImage from '../../src/images/login-background.jpg'
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
    <div>    
    <div className="login-page"> 
      <div className="titles">
        <h1 className="login-title">LOGIN USER</h1>
        <p className="login-subtitle">Please fill in this form to login.</p>
      </div>
    
      <form className="login-form" onSubmit={submittedForm}>

        <div className="form">
          <div className="login-email">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="login-password">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>        

        <div className="buttons">
          <button className="login-button" type="submit">LOG IN</button>
          <Link to="/">
            <button className="go_back button" type="button">GO BACK</button>        
          </Link>
        </div>
      </form>
      {empties !== '' && <span>{empties}</span>}
      <div>
        <img src={LoginImage} />
      </div>
    </div>
    </div>
  );
};

export default Login;
