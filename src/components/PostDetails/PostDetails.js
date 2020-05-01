import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { postById, updatePost, deletePost } from '../../services/firestoreData';
import Footer from '../Footer';
import postImage from '../../images/post-background.jpg';
import './PostDetails.scss';

const PostDetails = () => {
  const { postId } = useParams();
  const history = useHistory();

  const [postData, setPostData] = useState('');
  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const post = await postById('posts', postId);
      setTitle(postData.title);
      setComment(postData.comment);
      setPostData(post);
    };
    fetch();
  }, []);


  const updatePostComment = async (e) => {
    e.preventDefault();
    const updateTitle = title !== undefined ? title : postData.title;
    const updateComment = comment !== undefined ? comment : postData.comment;

    const result = await updatePost('posts', postId, { updateTitle, updateComment });
    return result ? history.goBack() : false;
  };

  const deletePostSubmit = async () => {
    const result = await deletePost('posts', postId);
    return result ? history.goBack() : false;
  };

  return (
    <div>
      <div className="post-details">
        <h1>YOU CAN MODIFY SOME FIELDS...</h1>
        <p>
          USER:
          { postData.user }
        </p>
        {edit ? (
          <div>
            <form onSubmit={updatePostComment}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </form>
          </div>
        )
          : <p title="click me" onClick={() => { setEdit(true) }}>EDIT TITLE: {postData.title}</p>}

        {edit ? (
          <div>
            <form onSubmit={updatePostComment}>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
              <div className="submit-button">
                <button type="submit">UPDATE COMMENTS</button>
              </div>
            </form>
          </div>
        )
          : <p title="click me" onClick={() => { setEdit(true) }}>EDIT REVIEW: {postData.comment}</p>}

        <div className="delete-button">
          <button type="submit" onClick={deletePostSubmit}>Delete Review</button>
        </div>

        <button className="go_back-button" type="button" onClick={() => history.goBack()}>GO BACK</button>

      </div>
      <div className="background">
        <img src={postImage} alt="post-brackground" />
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
