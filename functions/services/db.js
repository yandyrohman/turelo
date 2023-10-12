const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyALGwG9Arg1r-mgoS_lHME9Jb7vPZYz6Ec",
  authDomain: "work-management-yandi.firebaseapp.com",
  projectId: "work-management-yandi",
  storageBucket: "work-management-yandi.appspot.com",
  messagingSenderId: "346508205853",
  appId: "1:346508205853:web:f87834e224ac4b4d510bf4",
  measurementId: "G-PWGQVLD277"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

module.exports = db