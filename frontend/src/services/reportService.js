// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth , GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChF5BPaYqglgoLxRNzwUsGszSB87RakMk",
  authDomain: "community-hero-ai-f2872.firebaseapp.com",
  projectId: "community-hero-ai-f2872",
  storageBucket: "community-hero-ai-f2872.firebasestorage.app",
  messagingSenderId: "166944805830",
  appId: "1:166944805830:web:6cd4b163fdaaaf4b3618c7",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export  default{ app };