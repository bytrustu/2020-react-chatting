import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAE5iGkyTFYtbSiDCMNQocw0EXqGumWs9I',
  authDomain: 'react-chatting-79415.firebaseapp.com',
  databaseURL: 'https://react-chatting-79415.firebaseio.com',
  projectId: 'react-chatting-79415',
  storageBucket: 'react-chatting-79415.appspot.com',
  messagingSenderId: '515884524443',
  appId: '1:515884524443:web:d9cd9b0291f6b9cca4373e',
  measurementId: 'G-TM99QPXTW7',
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();