import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFcxeoA6-0ckhyMfXzjBQYD14OPa37rpg",
  authDomain: "nodespace-f7bc2.firebaseapp.com",
  projectId: "nodespace-f7bc2",
  storageBucket: "nodespace-f7bc2.firebasestorage.app",
  messagingSenderId: "300047440106",
  appId: "1:300047440106:web:0e38b0930ab7436f741f93",
  measurementId: "G-JR4C0SS97L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

function loginWithGoogle() {
  return signInWithPopup(auth, provider);
}

function logout() {
  return signOut(auth);
}

function requireAuth(onReady) {
  const overlay = document.createElement('div');
  overlay.id = 'auth-loading-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:#070b12;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:Sora,sans-serif;color:#9fb0c2;font-size:15px;';
  overlay.textContent = 'Checking authentication…';
  document.body.prepend(overlay);

  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    overlay.remove();
    if (onReady) onReady(user);
  });
}

async function loadNoticesFromFirestore() {
  const snap = await getDocs(collection(db, "notices"));
  const notices = [];
  snap.forEach(doc => notices.push(doc.data()));
  return notices;
}

async function loadFullDBFromFirestore() {
  const snap = await getDocs(collection(db, "notices"));
  const notices = [];
  snap.forEach(doc => notices.push(doc.data()));
  return { meta: { source: "firestore", total_notices: notices.length }, notices };
}

export { app, auth, db, provider, loginWithGoogle, logout, requireAuth, loadNoticesFromFirestore, loadFullDBFromFirestore, onAuthStateChanged };
