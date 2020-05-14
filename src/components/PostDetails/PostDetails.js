import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postById, updatePost, deletePost } from '../../services/firestoreData';
import { uploadImage, STATUS } from '../../services/storageFiles';
import Footer from '../Footer';
import postImage from '../../images/post-background.jpg';
import notFoundImage from '../../images/404.png';
import './PostDetails.scss';

const PostDetails = () => {
  const user = useSelector((state) => state.user);

  const { postId } = useParams();
  const history = useHistory();
  const [postData, setPostData] = useState('');
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const post = await postById('posts', postId);
      setTitle(post.title);
      setComment(post.comment);
      setImage(post.image);
      setPostData(post);
    };
    fetch();
  }, []);

  const HandleupdateImage = (e) => {
    const { files } = e.target;
    const file = files.length > 0 ? files[0] : null;

    if (file) {
      uploadImage('posts', file, (results) => {
        if (results.status === STATUS.FINISHED) setImage(results.url);
        else if (results.status === STATUS.WAITING) setProgress(results.progress);
      });
    }
  };

  const updatePostComment = async (e) => {
    e.preventDefault();
    const updateTitle = title !== undefined ? title : postData.title;
    const updateComment = comment !== undefined ? comment : postData.comment;
    const updateImage = image !== undefined ? image : postData.image;

    const result = await updatePost('posts', postId, { updateTitle, updateComment, updateImage });
    return result ? history.goBack() : false;
  };


  const deletePostSubmit = async () => {
    const result = await deletePost('posts', postId);
    return result ? history.goBack() : false;
  };

  return (
    <div>
      <div className="post-details">
        <nav>
          <Link to="/home">
            <button className="nav__button" type="button">GO BACK HOME</button>
          </Link>
          <div className="center">
            <h1>YOU CAN MODIFY SOME FIELDS...</h1>
            <p>USER: { user.name }</p>
          </div>
          <button className="go_back-button" type="button" onClick={() => history.goBack()}>GO BACK ALBUM DETAILS</button>
        </nav>
        <div className="edit-fields">
          {edit ? (
            <div className="title-edit">
              <form onSubmit={updatePostComment}>
                <p>EDIT TITLE HERE</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
              </form>
            </div>
          ) : <p className="title" title="click me" onClick={() => { setEdit(true) }}>EDIT TITLE HERE: {postData.title}</p>}

          {edit ? (
            <div className="review-edit">
              <form onSubmit={updatePostComment}>
                <p>EDIT REVIEW HERE</p>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
              </form>
            </div>
          ) : <p className="review" title="click me" onClick={() => { setEdit(true) }}>EDIT REVIEW HERE: {postData.comment}</p>}
        </div>

        <div className="image-edit">
          {edit ? (
            <form onSubmit={updatePostComment}>
              <div className="image-inner">
                <p className="title-inner">CHANGE OR KEEP IMAGE</p>
                <img src={image || notFoundImage} alt="" onChange={(e) => setImage(e.target.type)} />
                <input id="image" type="file" onChange={HandleupdateImage} />
                <div className="progress-bar">
                  <div className="progress-bar-content" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="buttons">
                {user.id === postData.userId && (
                  <div>
                    <button className="submit-button" type="submit">UPDATE COMMENTS</button>
                    <button className="delete-button" type="submit" onClick={deletePostSubmit}>DELETE REVIEW</button>
                  </div>
                )}
                <button className="go_back-button" type="button" onClick={() => history.goBack()}>GO BACK ALBUM DETAILS</button>
              </div>
            </form>
          ) : <p className="title-click" title="click me" onClick={() => { setEdit(true) }}>EDIT IMAGE: <img src={postData.image || notFoundImage} alt="" /></p>}
        </div>
        <div className="background">
          <img src={postImage} alt="post-brackground" />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PostDetails;
