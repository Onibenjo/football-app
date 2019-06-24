import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";

//Firebase configuration
const config = {
  apiKey: "AIzaSyDH2UNtZQC-7zBoDP1FnVV5ogG5FMat3jg",
  authDomain: "m-city-b2b4e.firebaseapp.com",
  databaseURL: "https://m-city-b2b4e.firebaseio.com",
  projectId: "m-city-b2b4e",
  storageBucket: "m-city-b2b4e.appspot.com",
  messagingSenderId: "901631605687",
  appId: "1:901631605687:web:5d1aada7e38103b9"
};
// Initialize Firebase
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
// firebaseDB
//   .ref("matches")
//   .once("value")
//   .then(res => {
//     console.log(res.val());
//   });

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB
};
