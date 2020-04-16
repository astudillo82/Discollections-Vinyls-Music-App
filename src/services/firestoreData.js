import * as firebase from 'firebase/app';
import 'firebase/firestore';
const db = () =>  firebase.firestore();


//SAVING DATA (FIRESTORE DATABSE)
const newPost = async  (reviews, createPost) => {
  const database = db ();

  try {
    const results = await database.collection(reviews).add(createPost);     
    return results.id
  } catch(error){
    return null
  } 
};


//GETTING(READING) DATA
const posts = async (reviews) => {
  const database = db ();

  const querySnapshot = await database.collection(reviews).get();
  const allPost = [];
  querySnapshot.forEach((doc) => {
    allPost.push({ 
      id: doc.id,
      ...doc.data(),
    });
  });
  return allPost;  
};


//ONSNAPSHOP(REAL-TIME)
const getSnapShot = (reviews, callback, albumId) => {
  const database = db ();
  
return database.collection(reviews)
.where('albumId','==', albumId)
.onSnapshot((querySnapshot) => {
    const allPost = [];
    querySnapshot.forEach((doc) => {
      allPost.push({ 
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(allPost)
  }) 
};
 

//GET POST BY ID
const postById = async (reviews, id) => {  
  const database = db ();
  const results = await database.collection(reviews).doc(id).get()
  return results.exists ? { id, ...results.data() } : null;
}; 


//UPDATE POST
const updatePost = async (reviews, id, comment) => {
  const database = db ();
  const results = await database.collection(reviews).doc(id).update({comment}); 
  return typeof results === 'undefined';
};

//CREATE NEW WITH ID
const newOneWithId = async (reviews, createPost, id) => {debugger
  const database = db (); 
  
  try {
    const results = await database.collection(reviews).doc(id).set(createPost) 
    console.log('results : ',  results)    
    return typeof results === 'undefined';
  } catch (error) {
    return null
  }
};

//DELETE POST
const deletePost = async (reviews, id) => {
  const database = db ();
  const results = await database.collection(reviews).doc(id).delete();
  return typeof results === 'undefined';
};


export {
    posts,
    newPost,
    getSnapShot,
    newOneWithId,
    postById,
    updatePost,  
    deletePost  
}
 