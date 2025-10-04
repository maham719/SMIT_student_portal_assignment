import {auth,onAuthStateChanged,signInWithEmailAndPassword, signOut,db,collection,addDoc,doc, setDoc,getDocs,onSnapshot,query, where, updatePassword ,updateDoc } from "./firebase.js"

let email=document.getElementById("loginemail")
let password=document.getElementById("loginpass")
let loginbtn=document.getElementById("login")
let username=document.getElementById("name");
let storedName = localStorage.getItem("username");
let closebtn=document.getElementById("closebtn")
if(closebtn){
  closebtn.addEventListener("click",()=>{
    closebtn.parentNode.remove()
  })
}
if (storedName && username) {
  username.innerText =`Welcome , ${storedName}`;
}

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

if(window.location.href.endsWith("index.html")){
    let loginfunc=()=>{

signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("login user" ,user)
    loggedin()
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

  loginbtn.addEventListener("click",loginfunc)
}

  function loggedin(){
    onAuthStateChanged(auth, (user) => {
  if (user) {
    toastr.success("login successful")
    window.location.href="dashboard.html"
    const uid = user.uid;
    // ...
  } else {
  toastr.warning("user does not exist")
  }
});
  }

//   dashboard logic 
 const links = document.querySelectorAll(".sidebar a");
    const sections = document.querySelectorAll(".content-section");

    links.forEach(link => {
      link.addEventListener("click", () => {
        // Remove "active" from all links
        links.forEach(l => l.classList.remove("active"));
        // Add "active" to clicked link
        link.classList.add("active");

        // Hide all content sections
        sections.forEach(sec => sec.classList.remove("active"));

        // Show the correct one
        const targetId = link.getAttribute("data-target");
        document.getElementById(targetId).classList.add("active");
      });
    });


// roll no logic 
function generateRollNumber() {
  let num = Math.floor(Math.random() * 1000) + 1;
;
  return num.toString().padStart(6, '0');
}

// Example: Generate one roll number


let overlay = document.getElementById("overlay");
let signupname=document.getElementById("signupname");
let timings=document.getElementById("timing");
let campus=document.getElementById("campus");
let Instructor=document.getElementById("Instructor");
let smitCourses=document.getElementById("smitCourses");
let city=document.getElementById("city")
let classdays=document.getElementById("classDays")
let registerbtn=document.getElementById("register");
   let preview=    document.getElementById("preview")
    // firestore database logic 
    let uploadedImage = null; 
     function openUploadWidget() {
        overlay.style.display="flex";
      cloudinary.openUploadWidget(
        {
          cloudName: "da7wtwv9r",
          uploadPreset: "images"
        },
        async (error, result) => {
        overlay.style.display="none";

          if (!error && result && result.event === "success") {
            const fileInfo = result.info;
            console.log("Uploaded:", fileInfo);
  uploadedImage = fileInfo;
            // Show uploaded image
         
          preview.innerHTML = `
          <img src="${fileInfo.secure_url}" width="200" height ="200">`;
          preview.style.width="150px";
          preview.style.height="150px";

          }
        }
      );
    }

   document.addEventListener("DOMContentLoaded", () => {
  let uploadimage = document.getElementById("regImage");
  if(uploadedImage){
    uploadimage.addEventListener("click", openUploadWidget);
  }
});

let user =()=>{
  onAuthStateChanged(auth, (user) => {
  if (user) {
    return user
    // ...
  } else {
  // toastr.warning("user does not exist")
  }
});
}
let registerStudent=async()=>{

let currentUser=auth.currentUser

    let rollNumber=generateRollNumber();
 if (!uploadedImage) {
    alert("Please upload an image first!");
    return;
  }
    overlay.style.display="flex"

  try {
    overlay.style.display = "flex";

    await setDoc(doc(db, "students", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      name: signupname.value,
      city: city.value,
      timings: timings.value,
      campus: campus.value,
      Instructor: Instructor.value,
      course: smitCourses.value,
      classdays: classdays.value,
      rollNumber: generateRollNumber(),
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
      format: uploadedImage.format,
      uploadedAt: new Date(),
    });

    toastr.success("Registration Successful ");
  } catch (e) {
    console.error("Error adding document: ", e);
    toastr.error("Something went wrong!");
  } finally {
    overlay.style.display = "none";
  }
};


if(registerbtn){
  registerbtn.addEventListener("click",registerStudent)
}


// dashboard student info logic 
let courseName=document.getElementById("courseName")
let infotiming=document.getElementById("infotimings");
let infocampus=document.getElementById("campusname");
let infocity=document.getElementById("cityname");
let inforollno=document.getElementById("rollNo");
let infodays=document.getElementById("infodays")
let infodata=document.getElementById("data")
let profilepic=document.getElementById("profilepic")
let displayname=document.getElementById("username")
let useremail=document.getElementById("useremail")
let userinfo=document.getElementById("userinfo")
let data=false

if(!data && infodata){
 infodata.style.display="block";
}
window.addEventListener("DOMContentLoaded",()=>{
  let getdata = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user && infodata) {
      console.log("No user logged in");
      
      infodata.style.display = "none";
      return;
    }
console.log(user)
    try {
 
      const q = query(collection(db, "students"), where("uid", "==", user.uid));

      onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          console.log("No data found for this user");
          infodata.style.display = "none";
          return;
        }

      userinfo.style.display="flex"
        infodata.style.display = "block";
       editbtns.style.display="flex"
        snapshot.forEach((doc) => {
          console.log(doc.data());
          let result = doc.data();
          useremail.innerHTML=user.email
          displayname.innerHTML=storedName
         profilepic.src=result.url
          courseName.innerHTML = result.course;
          infotiming.innerHTML = result.timings;
          infocampus.innerHTML = result.campus;
          infocity.innerHTML = result.city;
          inforollno.innerHTML = result.rollNumber;
          infodays.innerHTML = result.classdays;
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
};

getdata();
})


// profile logic 

let updatepassfunc = () => {
  const user = auth.currentUser;
  let newpass = document.getElementById("newpass");
  const newPassword = newpass.value;

  overlay.style.display = "flex"; // show overlay

  updatePassword(user, newPassword)
    .then(() => {
     toastr.success("password updated successfuly")
    })
    .catch((error) => {
      toastr.error("Error updating password")
      console.log(error)
    })
    .finally(() => {
      overlay.style.display = "none"; // hide overlay
    });
}

let updatePass=document.getElementById("updatepass")
if(updatePass){
  updatePass.addEventListener("click",updatepassfunc)
}

let save=document.getElementById("save")
let edit =document.getElementById("edit")
let editbtns=document.getElementById("editbtns")


let editdata=()=>{
  onAuthStateChanged(auth, (user) => {
    
    try {
 
      const q = query(collection(db, "students"), where("uid", "==", user.uid));

      onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          console.log("No data found for this user");
          
          return;
        }



        snapshot.forEach((doc) => {
          console.log(doc.data());
          let result = doc.data();
            preview.innerHTML = `
          <img src="${result.url}" width="200" height ="200">`;
          preview.style.width="150px";
          preview.style.height="150px";
signupname.value=result.name
 timings.value=result.timings
campus.value=result.campus,
Instructor.value=result.Instructor
smitCourses.value=result.course
city.value=result.city
classdays.value=result.classdays
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
}

let savedata = async () => {
  const studentRef = doc(db, "students", auth.currentUser.uid);
  try {
    overlay.style.display = "flex";

    await updateDoc(studentRef, {
      name: signupname.value,
      city: city.value,
      timings: timings.value,
      campus: campus.value,
      Instructor: Instructor.value,
      course: smitCourses.value,
      classdays: classdays.value,
      updatedAt: new Date()
    });

    toastr.success("Profile updated successfully ✅");
  } catch (error) {
    toastr.error("Error updating profile ❌");
    console.log(error);
  } finally {
    overlay.style.display = "none";
  }
};

if(save){
save.addEventListener("click", savedata);

}

if(edit){
  edit.addEventListener("click" , editdata)
}
