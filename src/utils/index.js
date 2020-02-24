import Firebase, { auth } from 'firebase';
import config from './config';

const app = Firebase.initializeApp(config);

function register(email, password) {
  app
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      return error;
    });
}

function login(email, password) {
  app
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      return error;
    });
}

function loginWithGoogle() {
  const google = new auth.GoogleAuthProvider();

  app
    .auth()
    .signInWithPopup(google)
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      return error;
    });
}

function getToken() {
  app
    .auth()
    .currentUser.getIdToken(false)
    .then((token) => {
      return token;
    })
    .catch((error) => {
      return error;
    });
}

module.exports = { getToken, login, loginWithGoogle, register };
