// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDQOKNKOJNHlmv6HdV6nOF3d1YeUWAtz4",
  authDomain: "zpet-images.firebaseapp.com",
  projectId: "zpet-images",
  storageBucket: "zpet-images.appspot.com",
  messagingSenderId: "560462802531",
  appId: "1:560462802531:web:b7880dbaee61d3f8015256",
};

// Initialize Firebase and Storage
export const db = initializeApp(firebaseConfig);
export const storage = getStorage();
