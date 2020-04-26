import * as firebase from 'firebase/app';
import 'firebase/firestore';

const db = () => firebase.firestore();

// POSTS
// SAVING DATA (FIRESTORE DATABSE)
const newPost = async (reviews, createPost) => {
  const database = db();

  try {
    const results = await database.collection(reviews).add(createPost);
    return results.id;
  } catch (error) {
    return null;
  }
};

// ONSNAPSHOP(REAL-TIME)
const getSnapShot = (reviews, callback, albumId) => {
  const database = db();

  return database.collection(reviews)
    .where('albumId', '==', albumId)
    .onSnapshot((querySnapshot) => {
      const allPost = [];
      querySnapshot.forEach((doc) => {
        allPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(allPost);
    });
};

// FAVORITES
// SAVING FAVS DATA(FIRESTORE DATABASE)
// const newFavorite = async (favorite, createFavorite) => {
//   const database = db ();
//   try {
//     const results = await database.collection(favorite).add(createFavorite);
//     return results.id

//   } catch (error) {
//     return null
//   }
// };

// //ONSNAPSHOP(REAL-TIME) FAVS
// const getSnapShotFav = (callback) => {
//   const database = db ();
  
// return database.collection('favorites')
// .onSnapshot((querySnapshot) => {
//     const allFavs = [];

//     querySnapshot.forEach((doc) => {
//       allFavs.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     callback(allFavs)
//   })
// };

// //CREATE NEW FAVORITE WITH ID
// const newFavWithId = async (favorite, createFavorite, id) => {
//   const database = db();

//   try {
//     const results = await database.collection(favorite).doc(id).set(createFavorite);
//     return typeof results === 'undefined';
//   } catch (error) {
//     return null
//   }
// };


// UPDATE FAVORITES
const myFavs = async (collection, id, { image, name, title, year, albumId }) => {
  const database = db();
  try {
    const results = await database.collection(collection).doc(id)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(
          { image, name, title, year, albumId })});
    return typeof results === 'undefined';
  } catch (error) {
    return null;
  }
};

// DELETE FAVORITES
const deleteFavs = async (collection, id,{ image, name, title, year, albumId }) => {debugger
  const database = db();
  try {
    const results = await database.collection(collection).doc(id)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(
          { image, name, title, year, albumId })});
    return typeof results === 'undefined';
  } catch (error) {
    return null;
  }
};


// GET POST BY ID
const postById = async (reviews, id) => {
  const database = db();
  const results = await database.collection(reviews).doc(id).get();
  return results.exists ? { id, ...results.data() } : null;
};


// UPDATE POST
const updatePost = async (reviews, id, comment) => {
  const database = db();
  const results = await database.collection(reviews).doc(id).update({ comment });
  return typeof results === 'undefined';
};

// CREATE NEW WITH ID
const newOneWithId = async (reviews, createPost, id) => {debugger
  const database = db();
  try {
    const results = await database.collection(reviews).doc(id).set(createPost);
    return typeof results === 'undefined';
  } catch (error) {
    return null;
  }
};

// DELETE POST
const deletePost = async (reviews, id) => {
  const database = db();
  const results = await database.collection(reviews).doc(id).delete();
  return typeof results === 'undefined';
};


export {
  newPost,
  getSnapShot,
  // newFavorite,
  // getSnapShotFav,
  newOneWithId,
  // newFavWithId,
  postById,
  updatePost,
  myFavs,
  deletePost,
  deleteFavs,
};
