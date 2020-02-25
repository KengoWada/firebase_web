import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { app } from '../../utils';
import '../../utils';
import moment from 'moment';
import '../../App.css';

const Posts = (props) => {
  const [ posts, setPosts ] = useState([]);
  const [ post, setPost ] = useState('');
  const [ loading, setLoading ] = useState([]);
  const [ user, setUser ] = useState(undefined);
  const [ posting, setPosting ] = useState(false);

  useEffect(() => {
    const user = props.location.state;
    // console.log('props', props.location.state);
    setUser(user);
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    return app.firestore().collection('Posts').orderBy('dateCreated', 'desc').onSnapshot((resp) => {
      let posts = [];
      resp.docs.forEach((doc) => {
        posts.push(doc.data());
      });
      setPosts(posts);
      setLoading(false);
    });
  };

  const postHandler = () => {
    setPosting(true);
    return app
      .firestore()
      .collection('Posts')
      .add({ name: user.displayName || user.email, post, dateCreated: new Date().toISOString() })
      .then((res) => {
        setPost('');
        console.log('rs from adding', res);
        setPosting(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('error from adding', err);
      });
  };

  // console.log('user logge din', user);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '70%',
        // border: '1px solid #ddd',
        margin: 'auto'
      }}
    >
      <div className="profile-container">
        <h3>welcome: [ {(user && user.displayName) || (user && user.email)} ]</h3>
        <div className="post-post-container">
          <textarea
            type="text"
            placeholder="Enter your post here"
            col="15"
            rows={20}
            onChange={(e) => setPost(e.target.value)}
            className="text-area"
          />
          <button className="post-button" onClick={postHandler}>
            {posting ? 'POSTING...' : 'SEND POST'}
          </button>
        </div>
      </div>
      <div className="posts-container">
        <h1>Posts</h1>
        {loading ? (
          <p style={{ fontSize: 13, fontWeight: 'bold' }}>Loading Posts...</p>
        ) : posts && posts.length > 0 ? (
          <div style={{ overflow: 'scroll', height: '700px' }}>
            {posts.map((post) => (
              <div style={{ backgroundColor: 'rgba(0,0,0,.045)', padding: '10px', margin: '0px 0px 10px 0px' }}>
                <p style={{ fontWeight: 'bold' }}>{post.name}</p>
                <p>{post.post}</p>
                <p style={{ color: '#aaa' }}>{moment(post.dateCreated).fromNow()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Posts available</p>
        )}
      </div>
    </div>
  );
};

export default withRouter(Posts);
