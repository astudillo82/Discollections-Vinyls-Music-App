import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSnapShot, newPost } from '../../services/firestoreData';

import './Comments.scss';

const Comments = ({ albumId }) => {
  const user = useSelector((state) => state.user);

  const [getPosts, setGetPosts] = useState([]);

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const unsubscribed = getSnapShot('posts', setGetPosts, albumId);
    return () => unsubscribed();
  }, []);

  const postSubmit = async (e) => {
    e.preventDefault();

    const createPost = {
      title,
      comment,
      albumId,
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
        <div>
          <label htmlFor="title"/>
          <input type="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label htmlFor='name'/>
          <input type="name" value={user.name || ''} disabled />
        </div>

        <div>
          <label htmlFor='comments'/>
          <textarea type="comments" value={comment} placeholder="Write your review here..." onChange={(e) => setComment(e.target.value)} />
        </div>

        <button type="submit" onClick={postSubmit}>Add Review</button>

        <Link to="/home">
          <button className="go_back-button" type="button">GO BACK</button>
        </Link>
      </div>

      <div>
        {getPosts.map((elem) => (
          <div className="posts" key={elem.id}>
            {user ? (
              <h1><Link to={`/album/post/${elem.id}`}>{elem.title}</Link></h1>
            ) : (null)}
            <h2>{elem.user}</h2>
            <h3>{elem.comment}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
