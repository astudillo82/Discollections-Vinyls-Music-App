/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogicMusic from '../../logic/LogicMusic';


const AlbumDetails = () => {
  const [details, setDetails] = useState({});

  const { album_id } = useParams();

  const getDetails = async () => {
    const newDetails = await LogicMusic.takeAlbumDetails(album_id);
    setDetails(newDetails);
  };


  useEffect(() => {
    getDetails();
  }, []);

  const {
    year,
    thumb,
    tracklist: [{ title } = {}] = [],
  } = details;

  return (
    <div className="results">
      <h1>ALBUM DETAILS</h1>
      <img src={`${thumb}`} alt="title" className="artist_cover" title={title} />
      <p>Title: {title}</p>
      <p>Year: {year}</p>
      <p>{`Tracklist: ${title}`}</p>
    </div>
  );
};

export default AlbumDetails;
