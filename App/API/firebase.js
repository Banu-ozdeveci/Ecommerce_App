import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-wyz8nfQYRx6H-PYT9KQ5_hasemE84Nw",
  authDomain: "banuapp-15de5.firebaseapp.com",
  databaseURL: "https://banuapp-15de5-default-rtdb.firebaseio.com",
  projectId: "banuapp-15de5",
  storageBucket: "banuapp-15de5.appspot.com",
  messagingSenderId: "110079950616",
  appId: "1:110079950616:web:647d8e8dfadd2fad62286d",
  measurementId: "G-29YMY0FXF3",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
