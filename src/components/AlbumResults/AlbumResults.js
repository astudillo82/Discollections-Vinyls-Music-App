import React from 'react';
import { Link } from 'react-router-dom';

const AlbumResults = (props) => {
  const {
    master_id,
    id,
    year,
    title,
    thumb, 
    label,
  } = props.item;

  return (
    <div className="results">
      <img src={`${thumb}`} alt="title" className="artist_cover" title={title} />
      <p>Title: {title}</p>
      <p>Year: {year}</p>
      <p>MASTER ID : {master_id}</p>
      <p>ID : {id}</p>
      <p>Label : {label}</p>
      <Link to={`/album/${master_id}`}>See Album Details</Link>
    </div>
  );
};

export default AlbumResults;
