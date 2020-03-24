/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signUp from '../services/signUp';

const Register = () => {debugger
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submittedForm = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return 'empties';
    }
    const result = await signUp(email, password);
    console.log('result = ', result);
  };


  return (
    <div>
      <h1>USER REGISTER</h1>
      <form onSubmit={submittedForm}>
        {/* <div>
          <label htmlFor="name">NAME</label>
          <input type="name" id="name" />
        </div> */}
        <div>
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button">REGISTER</button>
        <Link to="/">
          <button type="button">GO BACK</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
