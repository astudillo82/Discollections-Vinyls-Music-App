import React from 'react';
import { Link } from 'react-router-dom';

const ItemArtist = (props) => {
  const {
    master_id,
    year,
    title,
    thumb
  } = props.item;

  return (
    <div className="results">
      <img src={`${thumb}`} alt="title" className="artist_cover" title={title} />
      <p>Title: {title}</p>
      <p>Year: {year}</p>
      <p>ID : {master_id}</p>
      <Link to={`/album/${master_id}`}>See Album Details</Link>
    </div>
  );
};

export default ItemArtist;
