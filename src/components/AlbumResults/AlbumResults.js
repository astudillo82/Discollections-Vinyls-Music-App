import React from 'react';
import { Link } from 'react-router-dom';
import './AlbumResults.scss';
import notFoundImage from '../../images/404.png';

const AlbumResults = ({ item }) => {
  const { thumb, title, year, label, master_id, id } = item;
  const link = master_id != 0 ? `masters-${master_id}` : `releases-${id}`;
  return (
    <div className="album-results">
      <div className="content">
        <div className="image">
          <img src={thumb || notFoundImage} alt="title" className="image__album" title={title} />
          <br />
        </div>
        <div className="specs">
          <Link to={`/album/${link}`}>{title}</Link>
          <br />
          <p className="specs__label">{label}</p>
          <br />
          <p className="specs__year">{year}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumResults;
