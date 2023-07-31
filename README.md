# React + Vite

Download or clone this repo.
run:  # npm install

create a firebase.js file in the root dir.

 code:
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  config code goes here......
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {auth, app};
