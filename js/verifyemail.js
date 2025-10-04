    import{sendEmailVerification} from "./firebase.js"
let verbtn=document.getElementById("verifyEmail")

    let verifyemailfunc=()=>{
        sendEmailVerification(auth.currentUser)
  .then(() => {
    toastr.info("email has been sent... check your email to verify!")
    
  });
    }
    verbtn.addEventListener("click", verifyemailfunc)