// auth imports 
import {auth, createUserWithEmailAndPassword} from "./firebase.js";

// toster settings 
    toastr.options = {
  "closeButton": false,
  "debug": true,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

let email=document.getElementById("SignupEmail");
let password=document.getElementById("SignupPass");
let passRepeat=document.getElementById("Signup_re_pass")
let signupbtn=document.getElementById("signup")
let name=document.getElementById("signupname");
let message = document.getElementById("passwordMessage");

let overlay=document.getElementById("overlay")

let matchcheck = () => {
  if (password.value === "" || passRepeat.value === "") {
    message.textContent = "";
    return;
  }

  if (password.value !== passRepeat.value) {
    message.textContent = "❌ Passwords do not match";
    message.style.color = "red";
  } else {
    message.textContent = "✅ Passwords match";
    message.style.color = "green";
  }
};

password.addEventListener("input", matchcheck);
passRepeat.addEventListener("input", matchcheck);


let signupfunc=()=>{
overlay.style.display="flex";
createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {

       toastr.success("account successfully created")
      const user = userCredential.user;
    console.log(user)
     localStorage.setItem("username", name.value);
overlay.style.display="none";

    window.location.href="index.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
overlay.style.display="none";

    // ..
  });
}

signupbtn.addEventListener("click", signupfunc)