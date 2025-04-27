// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUQg49r7OnycwvbA_Px77ZAWYsYRnpD3c",
  authDomain: "practice-7c36e.firebaseapp.com",
  projectId: "practice-7c36e",
  storageBucket: "practice-7c36e.firebasestorage.app",
  messagingSenderId: "121704920161",
  appId: "1:121704920161:web:7f07782d40d96c1cfca620",
  measurementId: "G-KQ2J7HQPHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Signup function
window.signup = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful!");
      window.location.href = "welcome.html"; // Redirect to welcome page after success
    })
    .catch((error) => {
      alert(error.message); // Show error message
    });
}

// Login function
window.login = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "welcome.html"; // Redirect to welcome page after success
    })
    .catch((error) => {
      alert(error.message); // Show error message
    });
}

// Logout function
window.logout = function() {
  signOut(auth)
    .then(() => {
      alert("Logout successful!");
      window.location.href = "index.html"; // Redirect back to signup page after logout
    })
    .catch((error) => {
      alert(error.message); // Show error message
    });
}

// Google Sign-In function
window.google = function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Google sign-in successful!");
      window.location.href = "welcome.html"; // Redirect to welcome page after success
    })
    .catch((error) => {
      alert(error.message); // Show error message
    });
}
