/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../logic/AuthUser';
import RegisterImage from '../../images/register-background.jpg';
import './Register.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empties, setEmpties] = useState('');

  const history = useHistory();

  const submittedForm = async (e) => {
    e.preventDefault();
    setEmpties('');

    if (!name || !email || !password) {
      setEmpties('Please complete the fields');
      return;
    }

    const result = await registerUser(name, email, password);
    return result.correct ? history.push('/') : setEmpties(result.message);
  };

  return (
    <div className="register-page">
      <form className="form" onSubmit={submittedForm}>
        <div className="title">
          <h1 className="title__register">USER REGISTER</h1>
          <p className="title__subtitle">Please fill in this form to create an account.</p>
        </div>
        <div className="register">
          <input type="name" id="name" className="register__name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="name">NAME</label>
        </div>
        <div className="email">
          <input type="email" id="email" className="email__register" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="email">EMAIL</label>
        </div>
        <div className="password">
          <input type="password" id="password" className="password__register" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="password">PASSWORD</label>
        </div>
        <div className="buttons">
          <button className="buttons__register" type="submit">REGISTER</button>
          <Link to="/">
            <button className="buttons__go-back" type="button">GO BACK</button>
          </Link>
        </div>
        {empties !== '' && <span className="empty-message">{empties}</span>}
      </form>
      <div className="background">
        <img src={RegisterImage} alt="register-brackground" />
      </div>
    </div>
  );
};

export default Register;
