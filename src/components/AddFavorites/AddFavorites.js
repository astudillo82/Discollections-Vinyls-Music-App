import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteFavs } from '../../services/firestoreData';
import './AddFavorites.scss';


const AddFavorites = () => {
  const user = useSelector((state) => state.user);

  const handleDeleteFavorite = (e) => {
    e.preventDefault();
    deleteFavs('profiles', user.id, {
      image: user.image,
      name: user.name,
      title: user.title,
      year: user.year,
      albumId: user.albumId,
    });
  };


  return (
    <div>
      <h1>YOUR CUSTOM FAVORITE LIST</h1>
      <Link to="/home">
        <button className="go_back-button" type="button">GO BACK</button>
      </Link>
      {user.favorites && user.favorites.map((elem) => {
        return (
          <div key={elem.id}>
            <img src={elem.image} alt="title" className="artist_cover" title={elem.title} />
            <Link to={`/album/${elem.albumId}`}>{elem.title}</Link>
            <p>{elem.name}</p>
            <button type="button" onClick={handleDeleteFavorite}>DELETE FAVORITE</button>
          </div>
        );
      })}
    </div>
  );
};

export default AddFavorites;
