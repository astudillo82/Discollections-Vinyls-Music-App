import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogicMusic from '../../logic/LogicMusic';
import Comments from '../Comments';
import notFoundImage from '../../../src/images/404.png';
import './AlbumDetails.scss'

const AlbumDetails = () => {
  const [details, setDetails] = useState({});
  const { albumId } = useParams();

  const getDetails = async () => {
    const newDetails = await LogicMusic.takeAlbumDetails(albumId);
    setDetails(newDetails);
  };

  useEffect(() => {
    getDetails();
  }, []);


  const {
    images: [{ uri150 } = {}] = [],
    artists: [{ name } = {}] = [],
    title,
    year,
    styles,
    genres,   
  } = details;

  return (
    <div>
      <div className="album-details">
        <h1>ALBUM DETAILS</h1>
        <img src={uri150 ? uri150 : notFoundImage } alt="title" className="artist_cover" title={title} />  
        <button>ADD FAVORITE LIST</button>      
        <div className='details'>
          <p> ARTIST: {name}</p>
          <p> TITLE: {title}</p>
          <p> STYLES: {styles} </p>
          <p> YEAR: {year}</p>
          <p> GENRE: {genres}</p>
       </div>

      <div className="tracklist"><br/>
        <h2>TRACKLIST</h2><br/>
        {details.tracklist && details.tracklist.map((elem, key) => {
        return (       
        <p key={key}>{elem.position} - {elem.title} - {elem.duration} </p>
        )})}
        </div> <br/>    
      </div>    
      <Comments albumId={albumId}/>
    </div>
  );
};

export default AlbumDetails;
 