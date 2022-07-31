import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFikKE48pA0_TwSKENZqBmW6gQgDx8xG4",
  authDomain: "censura-auth.firebaseapp.com",
  projectId: "censura-auth",
  storageBucket: "censura-auth.appspot.com",
  messagingSenderId: "161478994568",
  appId: "1:161478994568:web:6ccb1467cdf3b3b441cd3d",
  measurementId: "G-PW2N5QNJG7",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
