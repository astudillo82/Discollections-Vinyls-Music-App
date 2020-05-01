import React from 'react';
import './Footer.scss';

const name = ' Castud ';
const Footer = () => (
  <div>
    <footer className="footer">
      { name }
      S.A., © copyright 2020
      { name }
    </footer>
  </div>
);

export default Footer;
