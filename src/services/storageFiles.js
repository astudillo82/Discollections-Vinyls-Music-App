import * as firebase from 'firebase';

export const STATUS = {
  WAITING: 'WAITING',
  ERROR: 'ERROR',
  FINISHED: 'FINISHED',
};

export const uploadImage = (folder, file, callback) => {
  try {
    const storageRef = firebase.storage().ref();
    const fileName = `${+(new Date())}-${file.name}`;
    const uploadTask = storageRef.child(`${folder}/${fileName}`).put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      const results = {
        status: STATUS.WAITING,
        error: '',
        progress,
        url: '',
      };

      callback(results);
    }, (error) => {
      const results = {
        status: STATUS.ERROR,
        error: 'Error uploading image...',
        progress: 0,
        url: '',
      };

      callback(results);
    }, async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
      const results = {
        status: STATUS.FINISHED,
        error: '',
        progress: 100,
        url: downloadURL,
      };
      callback(results);
    });
  } catch (error) {
    return error;
  }
};

export default uploadImage;
