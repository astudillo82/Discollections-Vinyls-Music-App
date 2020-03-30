import { fetchMusic, albumDetails } from '../services/fetchMusic';

class LogicMusic {
  static takeSearchArtist(page, perPage) {
    return fetchMusic(page, perPage);
  }

  static takeAlbumDetails(album_id) {
    return albumDetails(album_id);
  }
}

export default LogicMusic;
