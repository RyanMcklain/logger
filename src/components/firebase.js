import firebase from 'firebase';
import firebaseApp from 'firebase/app';

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
console.log(defaultDatabase);
