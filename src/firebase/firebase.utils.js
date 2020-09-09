import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDSSIW0rLkMu8zvgvx1IVk73i19mx0Fy64",
  authDomain: "crwn-db-6bdf0.firebaseapp.com",
  databaseURL: "https://crwn-db-6bdf0.firebaseio.com",
  projectId: "crwn-db-6bdf0",
  storageBucket: "crwn-db-6bdf0.appspot.com",
  messagingSenderId: "1018457301909",
  appId: "1:1018457301909:web:052ace0290f917d81c4c9c"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
