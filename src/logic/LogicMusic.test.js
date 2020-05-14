import LogicMusic from './LogicMusic';

describe('search artist', () => {
  const input = {};
  const id = '123456';


test('Should to be an object', async () => {
    const value = await LogicMusic.takeFindArtist(input);
    expect(typeof value).toBe('object');
});

test('Should to be an object', async () => {
    const value = await LogicMusic.takeHomeArtist();
    expect(typeof value).toBe('object');
});

test('Should to be an object', async () => {
    const value = await LogicMusic.takeArtistProfile(id);
    expect(typeof value).toBe('object');
  });
});

describe('album details', () => {
  const id = 'masters-123456';
  test ('Should to be an object', async () => {
    const value = await LogicMusic.takeAlbumDetails(id);
    expect(typeof value).toBe('object');
  });
});
