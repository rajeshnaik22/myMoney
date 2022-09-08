import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "mymoney-507f0.firebaseapp.com",
    projectId: "mymoney-507f0",
    storageBucket: "mymoney-507f0.appspot.com",
    messagingSenderId: "1044695469838",
    appId: "1:1044695469838:web:8162e358ee5550c534515f"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  // function to create timestamp type data
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }


 

  // authDomain: "mymoney-e251e.firebaseapp.com",
  // projectId: "mymoney-e251e",
  // storageBucket: "mymoney-e251e.appspot.com",
  // messagingSenderId: "170736212343",
  // appId: "1:170736212343:web:9d47b91b16faa9a8e3e972"