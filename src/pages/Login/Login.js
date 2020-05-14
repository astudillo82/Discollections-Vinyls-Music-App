/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logInUser } from '../../logic/AuthUser';
import LoginImage from '../../images/login-background.jpg';
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
    return result.correct ? history.push('/home') : setEmpties('Incorrect email and/or Password.');
  };

  return (
    <div>
      <div className="login-page">
        <form className="form" onSubmit={submittedForm}>
          <div className="title">
            <h1 className="title__login">LOGIN USER</h1>
            <p className="title__subtitle">Please fill in this form to login.</p>
          </div>
          <div className="email">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" className="email__login" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="password">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" className="email__password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="buttons">
            <button className="buttons__register" type="submit">LOG IN</button>
            <Link to="/">
              <button className="buttons__go-back" type="button">GO BACK</button>
            </Link>
          </div>
          {empties !== '' && <span className="empty-message">{empties}</span>}
        </form>
        <div>
          <img src={LoginImage} alt="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
