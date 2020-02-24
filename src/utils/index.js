import Firebase from 'firebase';
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

module.exports = { login, register };
