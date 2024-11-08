import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

async function emailSignUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === "auth/email-already-in-use") {
      return "Email already in use";
    } else {
      return errorMessage;
    }
  }
}

async function emailSignIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("error: ", error);
    if (errorCode === "auth/invalid-credential") {
      return "Email and password don't match an existing account. Try again.";
    }
    return errorMessage;
  }
}

// Function to set up the auth state listener
const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("error signing out: ", error);
  }
}

export { app, emailSignUp, emailSignIn, onAuthChange, signOutUser };
