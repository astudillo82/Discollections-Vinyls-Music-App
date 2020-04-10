import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogicMusic from '../../logic/LogicMusic';
import Comments from '../Comments';

const AlbumDetails = () => {
  const [details, setDetails] = useState({});
  const { _albumId } = useParams();


  const getDetails = async () => {
    const newDetails = await LogicMusic.takeAlbumDetails(_albumId);
    setDetails(newDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const {
    images: [{ uri150 } = {}] = [],
    artists: [{ name } = []] = [],
    title,
    year,
    styles,
    genres,  
  } = details;

  return (
    <div>
      <div className="results">
        <h1>ALBUM DETAILS</h1>
        <img src={uri150} alt="title" className="artist_cover" title={title} />
        <p> ARTIST : {name}</p>
        <p> TITLE :{title}</p>
        <p> STYLES : {styles} </p>
        <p> YEAR: {year}</p>
        <p> GENRE: {genres} </p>    
      </div>   

      <p>TRACKLIST</p><br/>    
      <div className="album-results">
        {details.tracklist && details.tracklist.map((elem, key) => {
        return (       
        <p key={key}>{elem.position} {elem.title} {elem.duration} </p>
        )})}
      </div>    
      <Comments comment_id={_albumId}/>
    </div>
  );
};

export default AlbumDetails;
