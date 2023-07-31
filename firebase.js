import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCsc9ZZ8h6J7xsNFSzeF-VHI53T47um7U4",
  authDomain: "orion-007.firebaseapp.com",
  projectId: "orion-007",
  storageBucket: "orion-007.appspot.com",
  messagingSenderId: "687446885979",
  appId: "1:687446885979:web:cdb69ba42eee201f3a617e",
  measurementId: "G-BQKL4FMNRJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }