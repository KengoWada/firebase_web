import Firebase, { auth } from 'firebase';
import config from './config';

const app = Firebase.initializeApp(config);

class Auth {
  static register(email, password) {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });
  }

  static logIn(email, password) {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });
  }

  static logInWithGoogle() {
    const google = new auth.GoogleAuthProvider();

    app
      .auth()
      .signInWithPopup(google)
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });
  }

  static getToken() {
    app
      .auth()
      .currentUser.getIdToken(false)
      .then(token => {
        return token;
      })
      .catch(error => {
        return error;
      });
  }
}

module.exports = { Auth };
