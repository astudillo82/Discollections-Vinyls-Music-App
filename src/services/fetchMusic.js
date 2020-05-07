/* eslint-disable no-async-promise-executor */
import axios from 'axios';

const API_KEY = 'IDEzlChCVBuEmXtiHrJu';
const API_SECRET = 'eJIIcgcBhFcXlqTMmhpAuuWUsmASmvSS';

// HOME PAGE
function fetchMusic() {
  return new Promise(async (resolve, reject) => {
    const query = 'https://api.discogs.com/database/search?format=vinyl&key=IDEzlChCVBuEmXtiHrJu&secret=eJIIcgcBhFcXlqTMmhpAuuWUsmASmvSS&page=1&per_page=25';

    try {
      const response = await axios.get(query);
      resolve(response.data);
    } catch (error) {
      reject(new Error('You have an error!!!'));
    }
  });
}

// SEARCH BY ARTIST
function findArtist(input) {
  return new Promise(async (resolve, reject) => {
    const query = `https://api.discogs.com/database/search?format=vinyl&artist=${input}&key=IDEzlChCVBuEmXtiHrJu&secret=eJIIcgcBhFcXlqTMmhpAuuWUsmASmvSS&page=1&per_page=25`;

    try {
      const response = await axios.get(query);
      resolve(response.data);
    } catch (error) {
      reject(new Error('You have an error!!!'));
    }
  });
}

// ARTIST PROFILE
function artistProfile(id) {
  return new Promise(async (resolve, reject) => {
    const query = `https://api.discogs.com/artists/${id}?secret=${API_SECRET}&key=${API_KEY}`;
    try {
      const response = await axios.get(query);
      resolve(response.data);
    } catch (error) {
      reject('You have an error!!!');// CHECK (put New Error ot not!!)
    }
  });
}

// NEXT URL
function searchFromUrl(url) {
  return new Promise(async (resolve, reject) => {
    const query = url;

    try {
      const response = await axios.get(query);
      resolve(response.data);
    } catch (error) {
      reject('You have an error!!!');// CHECK (put New Error ot not!!)
    }
  });
}

// ALBUM DETAILS(LINK TO)
function albumDetails(type, album_Id) {
  return new Promise(async (resolve, reject) => {
    const query = `https://api.discogs.com/${type}/${album_Id}?secret=${API_SECRET}&key=${API_KEY}`;

    try {
      const response = await axios.get(query);
      resolve(response.data);
    } catch (error) {
      reject('You have an error!!!');// CHECK (put New Error ot not!!)
    }
  });
}

export {
  fetchMusic,
  albumDetails,
  artistProfile,
  searchFromUrl,
  findArtist,
};
