import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAypLbOTw22RFsyG1ouZUVzBnifUdBt-5I",
  authDomain: "second-chat-cab6d.firebaseapp.com",
  projectId: "second-chat-cab6d",
  storageBucket: "second-chat-cab6d.appspot.com",
  messagingSenderId: "123614680167",
  appId: "1:123614680167:web:33092e745c09bce8f570c2",
  measurementId: "G-RBQ24H874B",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
