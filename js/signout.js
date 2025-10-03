import {auth, signOut } from "./firebase.js";



let signOutFunc=()=>{
    signOut(auth).then(() => {
 console.log("Sign-out successful.")
 window.location.href="index.html"
}).catch((error) => {
  console.log(error)
});
}
let signOutBtn=document.getElementById("signOutBtn");
signOutBtn.addEventListener("click" , signOutFunc);