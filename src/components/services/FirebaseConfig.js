
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtai6Q-lSKTquZK3MGXnIrng1F42LMc2s",
    authDomain: "coderhouse-ecommerce-1b7dd.firebaseapp.com",
    projectId: "coderhouse-ecommerce-1b7dd",
    storageBucket: "coderhouse-ecommerce-1b7dd.appspot.com",
    messagingSenderId: "76273923882",
    appId: "1:76273923882:web:8d54fba829c81188c81053"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let userId = '';
let userName = '';

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    userId = user.uid;
    userName = user.displayName;
    window.localStorage.setItem('user', JSON.stringify({userId: user.uid, userName: user.displayName}));
    const q = query(collection(db, "Users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "Users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password, success) => {
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password).then((userCredential) => {
      const user = userCredential.user;
      userId = user.uid;
      userName = user.displayName;
      window.localStorage.setItem('user', JSON.stringify({userId: user.uid, userName: user.displayName}));
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const user = res.user;
    const mail = email.trim();
    userId = user.uid;
    userName = user.displayName;
    window.localStorage.setItem('user', JSON.stringify({userId: user.uid, userName: user.displayName}));
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      mail,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email.trim());
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  userId = '';
  userName = '';
  signOut(auth);
};

if( localStorage.length > 0 && userId !== '') {
  window.localStorage.setItem('user', JSON.stringify(JSON.parse(localStorage.getItem('user'))))
  const user = JSON.parse(window.localStorage.getItem('user'));
  userId = user.userId;
};

export {
  auth,
  db,
  userId,
  userName,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
