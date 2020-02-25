import React, { useState, useEffect } from 'react';
import { Auth, Posts, app } from '../../utils';
import { auth } from 'firebase';
import LoginRegistration from './Registration';

export default function Registration () {
  const [ user, setUser ] = useState(undefined);

  // useEffect(() => {
  //   const google = new auth.GoogleAuthProvider();

  //   app
  //     .auth()
  //     .signInWithPopup(google)
  //     .then((resp) => {
  //       console.log(resp);
  //       setUser(resp);
  //       return resp;
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  // }, []);

  const loginWithGoogle = () => {
    const google = new auth.GoogleAuthProvider();

    app
      .auth()
      .signInWithPopup(google)
      .then((resp) => {
        console.log(resp);
        setUser(resp);
        return resp;
      })
      .catch((error) => {
        return error;
      });
  };

  const signOut = () => {
    return app
      .auth()
      .signOut()
      .then((resp) => {
        // console.log('SIGNOUT RES', resp);
        setUser(undefined);
      })
      .catch((error) => alert('Somethin gwent wrong while siginin out'));
  };
  return (
    <div>
      <LoginRegistration />
      {/* <button onClick={loginWithGoogle}>Login with google</button>
      <button onClick={signOut}>Signout</button>
      {user && <img src={user.user.photoURL} />}
      {user && <p>Name: {user.user.displayName}</p>} */}
    </div>
  );
}
