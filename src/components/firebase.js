import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// import firebaseApp from 'firebase/app';

var config = {
  apiKey: "AIzaSyAfmw8BBbYUxPwXwP8kkLqsHihNScUmz4A",
  authDomain: "logger-fe3bd.firebaseapp.com",
  databaseURL: "https://logger-fe3bd.firebaseio.com",
  projectId: "logger-fe3bd",
  storageBucket: "logger-fe3bd.appspot.com",
  messagingSenderId: "119768735200"
};

const firebaseApplication = firebase.initializeApp(config);
const defaultDatabase = firebaseApplication.database();
const provider = new firebase.auth.GoogleAuthProvider();

console.log(defaultDatabase);
console.log(firebase.app().name);

function writeUserData(userId, name, email, imageUrl) {
  defaultDatabase.ref('users/' + userId).set({
    username: 'foo2',
    email: 'lord',
    profile_picture : 'imageUrl'
  });
}

const getUserData = (userId) => {
  return defaultDatabase.ref('/users/' + userId).once('value').then(function (snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    console.log(username);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    writeUserData(user.uid);
    getUserData(user.uid);
  } else {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
});
