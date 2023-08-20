// import React, { useState, useEffect } from "react";
// import Post from "./Posts/Posts";
// import "./App.css";
// import { db, auth } from "./firebase/FirebaseInit";
// import { Modal } from "@mui/material";
// import ImageUpload from "./imageUpload/ImageUpload";

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [openSignup, setOpenSignup] = useState(false);
//   const [openLogin, setOpenLogin] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         console.log(authUser);
//         setUser(authUser);
//       } else {
//         setUser(null);
//       }
//     });
//   }, [user, username]);

//   useEffect(() => {
//     db.collection("posts")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) => {
//         setPosts(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             post: doc.data(),
//           }))
//         );
//       });
//   }, []);
//   const signUp = (e) => {
//     e.preventDefault();
//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then((authUser) => {
//         return authUser.user.updateProfile({
//           displayName: username,
//         });
//       })
//       .catch((err) => alert(err.message));
//     setOpenSignup(false);
//     setUsername("");
//     setEmail("");
//     setPassword("");
//   };
//   const login = (e) => {
//     e.preventDefault();
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .catch((err) => alert(err.message));
//     setOpenLogin(false);
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div className="app">
//       <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
//           <form className="app__signUp">
//             <input
//               placeholder="Username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               placeholder="Email address"
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               placeholder="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button className="primary__button" type="submit" onClick={signUp}>
//               Sign up
//             </button>
//           </form>
//       </Modal>
//       <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
//           <form className="app__signUp">
//             <input
//               placeholder="Email address"
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               placeholder="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button className="primary__button" type="submit" onClick={login}>
//               Log in
//             </button>
//           </form>
//       </Modal>
//       <div className="app__header">
//         <div className="app__headerWrapper">
//           <img src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram original logo"/>
//           {user ? (
//             <button className="text__button" onClick={() => auth.signOut()}>
//               Logout
//             </button>
//           ) : (
//             <div className="app__headerButtons">
//               <button
//                 className="primary__button"
//                 onClick={() => setOpenLogin(true) || setOpenSignup(false)}
//               >
//                 Log in
//               </button>
//               <button
//                 className="text__button"
//                 onClick={() => setOpenSignup(true) || setOpenLogin(false)}
//               >
//                 Sign up
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="timeline">
//         {user && <ImageUpload user={user} />}
//       {
//   posts.map(({ id, post }) => (
//     <Post
//       key={id}
//       postId={id}
//       user={user} // To pass current user and keep track of current user when adding comment
//       username={post.username}
//       caption={post.caption}
//       imageUrl={post.imageUrl}
//     />
//   ))
// }
//       </div>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import {auth, db} from "./Firebase/FirebaseInit"
import { useEffect } from "react";
import Home from "./Components/Home/Home";
import { Routes,Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import {useGlobalContext} from "./Context/Context";
function App(){
  const {username,user,setUser,setPosts} = useGlobalContext();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null)
      }
    })
  },[username,user]);

  useEffect(()=>{
    db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapshot)=>{
      setPosts(snapshot.docs.map((doc) =>({
        id : doc.id,
        post: doc.data(),
      })))
    })
  },[])

  return(
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile user={user} />} />
    </Routes>
    </>
  )
}
export default App;
