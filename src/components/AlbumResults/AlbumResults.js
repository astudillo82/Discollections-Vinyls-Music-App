import React from 'react';
import { Link } from 'react-router-dom';

const AlbumResults = (props) => {
  const {
    thumb, 
    title,
    year,
    label,
    master_id,
    id,
  } = props.item;
  
  return (
    <div className="results">
      <div>
      <img src={`${thumb}`} alt="title" className="artist_cover" title={title} /><br/>
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
