/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../logic/AuthUser';
import './Register.scss';
import RegisterImage from '../../src/images/register-background.jpg'


const Register = () => {
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

    const result = await registerUser(email, password);
    return result.correct ? history.push('/') : setEmpties(result.message);
  };


  return (    
    <div>      
      <div className="register-page">   
      <div className="titles">
        <h1 className="register-title">USER REGISTER</h1>
        <p className="register-subtitle">Please fill in this form to create an account.</p>
      </div> 

      <form className="register-form" onSubmit={submittedForm}>        

      <div className="form">
        <div className="register-email">          
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="register-password">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>    
      </div>      

      <div className="buttons">
          <button className="register-button" type="submit">REGISTER</button>  
          <Link to="/">
            <button className="go_back-button" type="button">GO BACK</button>
        </Link>               
      </div>   
      </form>     
      {empties !== '' && <span>{empties}</span>}
      <div>
        <img src={RegisterImage} />
      </div>     
      </div>
    </div>
  );
};

export default Register;
