import Firebase, { auth } from 'firebase';
import config from './config';

export const app = Firebase.initializeApp(config);

export class Auth {
  /**
   * Register a user with Firebase.
   *
   * Register a user with Firebase using their email and password.
   *
   * @param {String} email     The users email address.
   * @param {String} password  The users password.
   *
   * @returns {Object} Returns the response from the Firebase for both an error and success.
   */
  static register (email, password) {
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

  /**
   * Log in a user using their email and password.
   *
   * @param {String} email     The users email address.
   * @param {String} password  The users password.
   *
   * @returns {Object} Return the response from the Firebase for both an error and success.
   */
  static logIn (email, password) {
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

  /**
   * Log in user with their Google account.
   *
   * @returns {Object} Return the response from the Firebase for both an error and success.
   */
  logInWithGoogle () {
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

  /**
   * Get the users token for authentication.
   *
   * @returns {Object} Return the response from the Firebase for both an error and success.
   */
  static getToken () {
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
}

export class Posts {
  constructor (name, post) {
    this.name = name;
    this.post = post;
    this.postsCollection = app.firestore().collection('Posts');
  }

  create () {
    const postData = {
      name: this.name,
      post: this.post,
      uid: app.auth().currentUser.uid,
      createAt: new Date().toLocaleString()
    };

    this.postsCollection
      .add(postData)
      .then((resp) => {
        return resp;
      })
      .catch((error) => {
        return error;
      });
  }

  static getPosts () {
    this.postsCollection
      .get()
      .then((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        return posts;
      })
      .catch((error) => {
        return error;
      });
  }
}

// module.exports = { Auth, Posts };
