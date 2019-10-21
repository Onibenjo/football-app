import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

//Firebase configuration
const config = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FB}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FB}.firebaseio.com`,
  projectId: `${process.env.REACT_APP_FB}`,
  storageBucket: `${process.env.REACT_APP_FB}.appspot.com`,
  messagingSenderId: `${process.env.REACT_APP_MSG_ID}`,
  appId: `${process.env.REACT_APP_APPID}`
};
// Initialize Firebase
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
  firebaseDB
};
