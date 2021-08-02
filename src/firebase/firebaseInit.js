import firebase from "firebase/app";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAGpLIWWYTpMwHqJ24wy4ww2UBKa_SeDM",
  authDomain: "my-blog-d20dc.firebaseapp.com",
  projectId: "my-blog-d20dc",
  storageBucket: "my-blog-d20dc.appspot.com",
  messagingSenderId: "450793977451",
  appId: "1:450793977451:web:c0aa22da564b3e6ccae32e",
  measurementId: "G-WDK7TM5DVS",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { timestamp };
export default firebaseApp.firestore();
