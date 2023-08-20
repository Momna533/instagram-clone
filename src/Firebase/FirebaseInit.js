// import fb from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
// import "firebase/compat/storage";

// const firebaseApp = fb.initializeApp({
//   apiKey: "AIzaSyDSeYY8Y8DRbe8lw7dyklb0TOpMsTdZfeg",
//   authDomain: "instagram-clone-ef282.firebaseapp.com",
//   projectId: "instagram-clone-ef282",
//   storageBucket: "instagram-clone-ef282.appspot.com",
//   messagingSenderId: "1030903034811",
//   appId: "1:1030903034811:web:19ad3d903be0d1a2c90a9e",
// });

// const db = firebaseApp.firestore();
// const auth = fb.auth();
// const storage = fb.storage();

// export { db, auth, storage, fb };

import fb from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyDSeYY8Y8DRbe8lw7dyklb0TOpMsTdZfeg",
  authDomain: "instagram-clone-ef282.firebaseapp.com",
  projectId: "instagram-clone-ef282",
  storageBucket: "instagram-clone-ef282.appspot.com",
  messagingSenderId: "1030903034811",
  appId: "1:1030903034811:web:19ad3d903be0d1a2c90a9e",
});

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export { db, fb, auth, storage };
