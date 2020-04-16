import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumResults.scss'; 
import notFoundImage from '../../../src/images/404.png';
const AlbumResults = (props) => {
  const {
    thumb,    
    title,
    year,
    label,
    master_id    
  } = props.item;
  
  return (
    <div className="results">
      <div>
      <img src={thumb ? thumb : notFoundImage} alt="title" className="artist_cover" title={title} /><br/>
      </div>

      <div className="specs">
        <Link to={`/album/${master_id}`}>{title}</Link>    
        <p>{label}</p>
        <p>{year}</p>       
      </div>     
    </div>
  );
};

export default AlbumResults;
