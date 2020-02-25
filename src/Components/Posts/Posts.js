import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { app } from '../../utils';
import '../../utils';
import moment from 'moment';

const Posts = (props) => {
  const [ posts, setPosts ] = useState([]);
  const [ post, setPost ] = useState('');
  const [ loading, setLoading ] = useState([]);
  const [ user, setUser ] = useState(undefined);

  useEffect(() => {
    const user = props.location.state;
    setUser(user);
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    return app.firestore().collection('Posts').onSnapshot((resp) => {
      let posts = [];
      resp.docs.forEach((doc) => {
        posts.push(doc.data());
      });
      setPosts(posts);
      setLoading(false);
    });
  };

  const postHandler = () => {
    setLoading(true);
    return app
      .firestore()
      .collection('Posts')
      .add({ name: 'isaac', post, dateCreated: new Date().toISOString() })
      .then((res) => {
        console.log('rs from adding', res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log('error from adding', err);
      });
  };

  console.log('POSTS', user);
  return (
    <div>
      <textarea
        type="text"
        placeholder="Enter your post here"
        col="15"
        rows={20}
        onChange={(e) => setPost(e.target.value)}
      />
      <button onClick={postHandler}>SEND POST</button>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading Posts</p>
      ) : posts && posts.length > 0 ? (
        posts.map((post) => (
          <div>
            <p>{post.name}</p>
            <p>{post.post}</p>
            <p>{moment(post.dateCreated).fromNow()}</p>
          </div>
        ))
      ) : (
        <p>No Posts available</p>
      )}
    </div>
  );
};

export default withRouter(Posts);
