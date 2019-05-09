import firebase from 'firebase';
// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyBEMSMEQfzkeUtdze0_S-TZdWnUB3ZnXZc',
  authDomain: 'sksy-backend.firebaseapp.com',
  databaseURL: 'https://sksy-backend.firebaseio.com',
  projectId: 'sksy-backend',
  storageBucket: 'sksy-backend.appspot.com',
  messagingSenderId: '212590654313',
  appId: '1:212590654313:web:3d9f1dcff496156c'
};
const Firebase = firebase.initializeApp(config);
export default Firebase;
