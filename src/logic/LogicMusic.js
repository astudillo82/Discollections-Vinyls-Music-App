import {
  fetchMusic,
  albumDetails,
  artistProfile,
  findArtist,
  searchFromUrl,
} from '../services/fetchMusic';

class LogicMusic {
  static takeHomeArtist() {
    return fetchMusic();
  }

  static takeFindArtist(input) {
    return findArtist(input);
  }

  static takeArtistProfile(id) {
    return artistProfile(id);
  }

  static takeSearchFromUrl(url) {
    return searchFromUrl(url);
  }

  static takeAlbumDetails(id) {
    const splitId = id.split('-');
    return albumDetails(splitId[0], splitId[1]);
  }
}

export default LogicMusic;
