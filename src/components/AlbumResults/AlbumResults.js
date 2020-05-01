import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumResults.scss';
import notFoundImage from '../../images/404.png';

const AlbumResults = ({ item }) => { 
  const { thumb, title, year, label, master_id, id } = item;
  const link = master_id != 0 ? `masters-${master_id}` : `releases-${id}`;
  return (
    <div className="results">
      <div>
        <img src={thumb || notFoundImage} alt="title" className="artist_cover" title={title} />
        <br />
      </div>

      <div className="specs">
        <Link to={`/album/${link}`}>{title}</Link>
        <br />
        <p className="label">{label}</p>
        <br />
        <p className="year">{year}</p>
      </div>
    </div>
  );
};

export default AlbumResults;
