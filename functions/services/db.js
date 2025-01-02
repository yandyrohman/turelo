const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBcdjmlHBSoew6vUnCUfq0QdqVD0P6Z0d8",
  authDomain: "turelo-4d089.firebaseapp.com",
  projectId: "turelo-4d089",
  storageBucket: "turelo-4d089.firebasestorage.app",
  messagingSenderId: "101682914850",
  appId: "1:101682914850:web:899ef708feed3f8c218c7b",
  measurementId: "G-LTJ59YGGF2"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

module.exports = db