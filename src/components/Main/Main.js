import React from 'react';
import { Link } from 'react-router-dom';
import MainImage from '../../images/main-background.jpg';
import './Main.scss';

const Main = () => (
  <div>
    <div className="main-page">
      <h1 className="title">DISCOLLECTION VINYLS MUSIC APP</h1>
      <div className="links">
        <li className="links-register"><Link to="/register">Register</Link></li>
        <li className="links-login"><Link to="/Login">Log In</Link></li>
      </div>
    </div>
    <div className="main-page background">
      <img src={MainImage} alt="main-background" />
    </div>
  </div>
);

export default Main;
