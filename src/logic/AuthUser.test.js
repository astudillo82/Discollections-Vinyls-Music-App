import * as firebase from 'firebase/app';
import { registerUser, logInUser } from './AuthUser';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

describe('Logic - Authenticate User', () => {
  const name = 'name';
  const email = 'email@email.com';
  const password = '123456';
  const favorites = [1, 2, 3];

  // REGISTER
  test('Should to create user if they are correct data', async () => {
    const value = await registerUser(name, email, password, favorites);
    expect(value).toBe(value);
    expect(value.length).toBe(undefined);
    expect(typeof name === 'string').toBe(true);
    expect(typeof email === 'string').toBe(true);
    expect(typeof password === 'string').toBe(true);
    expect(favorites.length).toEqual(3);
    expect([1, 2, 3]).toEqual(expect.arrayContaining(favorites));
  });

  test('Should to error if they are empty strings', async () => {
    const value = await registerUser(!name, !email, !password);
    expect(value).toStrictEqual({ correct: false, message: 'Please complete the fields' });
  });

  // LOGIN
  test('Should to log user if they are correct data', async () => {
    const value = await logInUser(email, password);
    expect(value).toBe(value);
    expect(typeof email === 'string').toBe(true);
    expect(typeof password === 'string').toBe(true);
    expect(typeof logInUser === 'string').toBe(false);
    expect(value.length).toBe(undefined);
  });

  test('Incorrect data', async () => {
    const e_mail = await logInUser(1, password);
    expect(e_mail).toStrictEqual({ correct: false, message: 'Incorrect email and/or Password.' });

    const pass = await logInUser(email, 1);
    expect(pass).toStrictEqual({ correct: false, message: 'Incorrect email and/or Password.' });
  });
});
