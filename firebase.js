const firebase = require('firebase')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDoofK_4XF0APtKn4ycjPGvHVXPqq4p3fc',
  authDomain: 'geosite-352de.firebaseapp.com',
  projectId: 'geosite-352de',
  storageBucket: 'geosite-352de.appspot.com',
  messagingSenderId: '5552020933',
  appId: '1:5552020933:web:8e29e0739b666af25cffac',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

module.exports = db
