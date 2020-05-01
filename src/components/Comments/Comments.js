import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSnapShot, newPost } from '../../services/firestoreData';
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

  const [empties, setEmpties] = useState('');

  useEffect(() => {
    const unsubscribed = getSnapShot('posts', setGetPosts, albumId);
    return () => unsubscribed();
  }, []);

  const postSubmit = async (e) => {
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
      rating: selectStar,
      user: user.name,
      userId: user.id,
    };

    const result = await newPost('posts', createPost);
    return result;
  };


  return (
    <div>
      <div className="comments">
        <h1>ADD A REVIEW</h1>
        <br />

        <div className="labels">
          <div>
            <label htmlFor={"name"} />
            <br />
            {/* <RatingAlbum /> */}

            <p className="rating">
              RATING :
              <div className="star-rating">
                {[...Array(5)].map((elem, index) => {
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
            <input type="name" value={user.name || ''} disabled />
          </div>

          <div>
            <label htmlFor="title"/>
            <input type="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <br />
        </div>

        {empties !== '' && <span>{empties}</span>}
        <div className="text-area">
          <label htmlFor="comments" />
          <textarea type="comments" value={comment} placeholder="Write your review here..." onChange={(e) => setComment(e.target.value)} />
        </div>
        <div className="buttons">
          <button type="submit" onClick={postSubmit}>Add Review</button>
          <Link to="/home">
            <button className="go_back-button" type="button">GO BACK</button>
          </Link>
        </div>
      </div>

      <div>
        {getPosts.map((elem) => (
          <div className="posts" key={elem.id}>
            {user ? (
              <h1 title="you can update your review"><Link to={`/album/post/${elem.id}`}>{elem.user}</Link></h1>
            ) : (null)}

            <p className="rating">
              RATING :
              <div className="star-rating">
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
            </p>
            {/* <RatingAlbum selected={elem.rating} /> */}
            <h2>{elem.title}</h2>
            <h3>{elem.comment}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
