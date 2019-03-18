import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyAfmw8BBbYUxPwXwP8kkLqsHihNScUmz4A",
  authDomain: "logger-fe3bd.firebaseapp.com",
  databaseURL: "https://logger-fe3bd.firebaseio.com",
  projectId: "logger-fe3bd",
  storageBucket: "logger-fe3bd.appspot.com",
  messagingSenderId: "119768735200"
};

const firebaseApplication = firebase.initializeApp(config);
export const database = firebaseApplication.database();
const provider = new firebase.auth.GoogleAuthProvider();

// const setUserLog = (userId, log) => {
//   database.ref('/logs/' + userId).push(log);
// }

// const getUserLogs = userId => {
//   return database.ref('/logs/' + userId).once('value').then(snapshot => {
//     const logs = snapshot.val() || [];
//     console.log(logs);
//   });
// }


export const onUserAuth = async (changeAuthState = () => {}) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('hello', user.email);
      changeAuthState(user);
      // writeUserData(user.uid);
      // getUserData(user.uid);
    } else {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log('hello', user.email);
        changeAuthState(user);
      }).catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...

        changeAuthState(false);
      });
    }
  });
};
