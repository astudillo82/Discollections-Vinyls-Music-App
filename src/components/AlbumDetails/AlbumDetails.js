/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogicMusic from '../../logic/LogicMusic';


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
    images: [{ uri } = {}] = [],
    // thumb,
    // artists_sort,
    artists: [{ name } = []] = [],
    title,
    // released,
    year,
    // country,
    styles,
    // extraartists: [{ name } = {}] = [],
    // labels: [{ name } = {}] = [],
    // formats: [{ name } = {}] = [],
    genres,
    // tracklist: [{ title } = {}] = [],
  } = details;

  return (
    <div className="results">
      <h1>ALBUM DETAILS</h1>
      <img src={uri} alt="title" className="artist_cover" title={title} />
      <p>ARTIST : {name}</p>
      <p>Title: {title}</p>
      {/* <p>Year: {released}</p> */}
      <p>Year: {year}</p>
      {/* <p>country : {country}</p> */}
      <p>styles : {styles}</p>
      {/* <p>Credits : {name}</p> */}
      {/* <p>Label : {name}</p> */}
      {/* <p>Format: {name}</p> */}
      <p>Genre: {genres}</p>
      {/* <p>{`Tracklist: ${title}`}</p> */}
    </div>
  );
};

export default AlbumDetails;
