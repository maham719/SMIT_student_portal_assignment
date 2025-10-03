import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged , signInWithEmailAndPassword ,sendEmailVerification, signOut, updatePassword  } from'https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js'
import { getFirestore , collection, addDoc,doc, setDoc,getDocs,onSnapshot,query, where,updateDoc  } from'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js'

  const firebaseConfig = {
    apiKey: "AIzaSyCgCk2NfXP_zKieCCXaoB8ovrOH5UH_ZrI",
    authDomain: "studentportal-25c07.firebaseapp.com",
    projectId: "studentportal-25c07",
    storageBucket: "studentportal-25c07.firebasestorage.app",
    messagingSenderId: "556359252403",
    appId: "1:556359252403:web:01d556bf77072f68eff3c6"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
  export{auth,createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,sendEmailVerification, signOut,db,collection,addDoc,doc, setDoc,getDocs,onSnapshot,query, where, updatePassword ,updateDoc }