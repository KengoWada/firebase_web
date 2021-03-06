import React, { useState, useEffect } from 'react';
import '../../App.css';
import firebase, { auth, storage } from 'firebase';
import { app } from '../../utils';
import { withRouter } from 'react-router-dom';

const Registration = (props) => {
  const [ login, setLogin ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const [ email, setEmail ] = useState('musanje2010@gmail.com');
  const [ password, setPassword ] = useState('personGoogle45');
  // const [ email, setEmail ] = useState('');
  // const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(undefined);
  // const [ loggedin, setLoggedin ] = useState(false);

  useEffect(() => {
    // const user = auth().currentUser;
    // setUser(user);
    console.log('current user', getCurrentUser());
  });

  const getCurrentUser = () => {
    return app.auth().currentUser;
  };

  // login handler
  const loginHandler = (e) => {
    setLoading(true);
    return app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        setLoading(false);
        // console.log('login response', typeof resp.user);
        // setUser(resp);
        setUser(resp);
        props.history.push('/posts', {
          email: resp.user.email,
          uid: resp.user.uid,
          displayName: resp.user.displayName
        });
      })
      .catch((error) => {
        // return error;
        console.log(error);
        alert(error.message);
      });
  };

  // register using email and password
  const RegisterHandler = (e) => {
    return app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        // setUser(resp);
        // return resp;
      })
      .catch((error) => {
        // return error;
        console.log(error);
        alert(error.message);
      });
  };

  // login with google handler
  const loginWithGoogle = () => {
    const google = new auth.GoogleAuthProvider();

    app
      .auth()
      .signInWithPopup(google)
      .then((resp) => {
        console.log('USING GOOGLE ACCONT', resp.user);
        setUser(resp);
        props.history.push('/posts', {
          email: resp.user.email,
          uid: resp.user.uid,
          displayName: resp.user.displayName
        });
      })
      .catch((error) => {
        return error;
      });
  };

  // switch between login and registration hanlder
  const switchMode = () => {
    setLogin(!login);
  };

  return (
    <div className="login-container">
      <h2>{login ? 'Login to your account' : 'Register new account'}</h2>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login ? loginHandler : RegisterHandler}>{login ? 'Login' : 'Register'}</button>

      <div style={{ minWidth: '200px', borderBottom: '1px solid #eee' }} />
      <button onClick={switchMode}>{!login ? 'Switch to Login' : 'Switch to Register'}</button>

      {loading && <p>Loading, please wait....</p>}

      <button className="google-login" onClick={loginWithGoogle}>
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
};

export default withRouter(Registration);
