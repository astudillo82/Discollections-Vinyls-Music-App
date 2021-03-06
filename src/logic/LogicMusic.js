import {
  fetchMusic,
  albumDetails,
  findArtist,
  searchFromUrl,
} from '../services/fetchMusic';

class LogicMusic {
  static takeFindArtist(input) {
    return findArtist(input);
  }

  static takeHomeArtist() {
    return fetchMusic();
  }

  static takeSearchFromUrl(url) {
    return searchFromUrl(url);
  }

  static takeAlbumDetails(album_id) {
    return albumDetails(album_id);
  }

}

export default LogicMusic;
