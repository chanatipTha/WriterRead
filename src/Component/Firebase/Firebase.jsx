// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app" ;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxxaprvIQrwp3_Al5rvwJ0QEpRe1uSLEE",
  authDomain: "writerread-682d5.firebaseapp.com",
  projectId: "writerread-682d5",
  storageBucket: "writerread-682d5.appspot.com",
  messagingSenderId: "1056573029461",
  appId: "1:1056573029461:web:46c2f693288f21b81d68dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app ;