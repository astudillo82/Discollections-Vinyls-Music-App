import React, { useState } from 'react';
// import { myRating } from '../../services/firestoreData';
import './RatingAlbum.scss';

const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? 'star selected' : 'star'} onClick={onClick} />
);

const RatingAlbum = () => {
  const [selectStar, setSelectStar] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((elem, index) => {
        const rating = index + 1;
        return (
          <Star
            key={elem}
            selected={index < selectStar}
            onClick={() => setSelectStar(rating)}
            value={rating}
          />
        );
      })}
    </div>
  );
};


export default RatingAlbum;
