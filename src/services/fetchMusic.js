import axios from 'axios';

const DISCOGS_API_URL = 'https://api.discogs.com/database/search?format=vinyl';
const API_KEY = 'IDEzlChCVBuEmXtiHrJu';
const API_SECRET = 'eJIIcgcBhFcXlqTMmhpAuuWUsmASmvSS';


function fetchMusic(page, perPage) {
  return new Promise(async (resolve, reject) => {
    let query = `${DISCOGS_API_URL}&key=${API_KEY}&secret=${API_SECRET}&`;
    if (page && perPage) query += `page=${page}&per_page=${perPage}`;

    try {
      const response = await axios.get(query);
      resolve(response.data.results);
    } catch (error) {
      reject ('You have an error!!!');
    }
  });
}


function albumDetails(album_id) {
  return new Promise(async(resolve, reject) => {
    let query = 'https://api.discogs.com/masters/';
    if (album_id) query += `${album_id}`;

    try {
      const response = await axios.get(query);
      resolve(response.data);
    } catch (error) {
      reject('You have an error!!!');
    }
  });
}


export {
  fetchMusic,
  albumDetails,
};
