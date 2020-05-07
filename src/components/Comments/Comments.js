import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSnapShot, newPost } from '../../services/firestoreData';
import { uploadImage, STATUS } from '../../services/storageFiles';
import notFoundImage from '../../images/404.png';
// import RatingAlbum from '../RatingAlbum';
import './Comments.scss';

const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? 'star selected' : 'star'} onClick={onClick} />
);

const Comments = ({ albumId }) => {
  const user = useSelector((state) => state.user);
  const [getPosts, setGetPosts] = useState([]);

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [selectStar, setSelectStar] = useState(0);

  const [image, setImage] = useState('');

  const [empties, setEmpties] = useState('');

  useEffect(() => {
    const unsubscribed = getSnapShot('posts', setGetPosts, albumId);
    return () => unsubscribed();
  }, []);

  const postSubmit = async (e) => {debugger
    e.preventDefault();
    setEmpties('');
    if (!title || !comment) {
      setEmpties('Please, write the title and some review...');
      return;
    }
    const createPost = {
      title,
      comment,
      albumId,
      image,
      rating: selectStar,
      user: user.name,
      userId: user.id,
    };

    const result = await newPost('posts', createPost);
    setTitle('');
    setComment('');
    return result;
  };

  const HandleuploadImage = (e) => {
    const { files } = e.target;
    const file = files.length > 0 ? files[0] : null;

    if (file) {
      uploadImage('posts', file, (results) => {
        if (results.status === STATUS.FINISHED) {
          setImage(results.url);
        }
      });
    }
  };

  return (
    <div className="comments">

      <div className="title">
      <h1>ADD A REVIEW</h1>
      </div>
      <br />
      <p className="rating">
        RATING :
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((elem, index) => {
            const rating = index + 1;
            return (
              <Star
                key={index}
                selected={index < selectStar}
                onClick={() => setSelectStar(rating)}
                value={rating}
              />
            );
          })}
        </div>
      </p>
      <br />

      <form className="review-form" onSubmit={postSubmit}>

        <div className="inputs">
          <label htmlFor="name" />
          <input className="name" type="name" value={user.name || ''} disabled />

          <label htmlFor="title"/>
          <input className="title" type="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <br />

          {empties !== '' && <span className="empty">{empties}</span>}

          <div className="text-area">
            <label htmlFor="comments" />
            <textarea type="comments" value={comment} placeholder="Write your review here..." onChange={(e) => setComment(e.target.value)} />
          </div>

          <div className="add-image">
            <input type="file" id="image" onChange={HandleuploadImage} />
          </div>

          <div className="buttons">
            <button type="submit" onClick={postSubmit} onChange={() => setEmpties('')}>Add Review</button>
          </div>
        </div>

      </form>

      {getPosts.map((elem) => (
        <div className="reviews" key={elem.id}>
          {user.id === elem.userId ? (
            <h1 title="click me if you want to update your review..."><Link to={`/album/post/${elem.id}`}>{elem.user}</Link></h1>
          ) : <h1>{elem.user}</h1>}

          <div className="rating">
            <div className="star-rating">
              <h2>RATING :</h2>
              {[...Array(5)].map((item, index) => {
                const rating = index + 1;
                return (
                  <Star
                    key={index}
                    selected={index < elem.rating}
                    value={rating}
                  />
                );
              })}
            </div>
          </div>
          <img src={elem.image || notFoundImage} className="image" alt="" />
          <div className="text">
            <h2>{elem.title}</h2>
            <h3>{elem.comment}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
