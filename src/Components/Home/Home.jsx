import { Modal } from "@mui/material";
import Post from "../Posts/Posts";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useState } from "react";
import {useGlobalContext} from "../../Context/Context";
import { auth } from "../../Firebase/FirebaseInit";
import { Link } from "react-router-dom";

const Home = ()=>{
    const {openSignup,username,email,password,openLogin,user,posts,setOpenLogin,setOpenSignup,setEmail,setPassword} = useGlobalContext();

    const signUp = (e) => {
        e.preventDefault();
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            return authUser.user.updateProfile({
              displayName: username,
            });
          })
          .catch((err) => alert(err.message));
        setOpenSignup(false);
        setUsername("");
        setEmail("");
        setPassword("");
      };
    
       const login = (e) => {
        e.preventDefault();
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((err) => alert(err.message));
        setOpenLogin(false);
        setEmail("");
        setPassword("");
      };

      function UserDisplayName({ user }) {
        return user ? <Link to="/profile">{user.displayName}</Link> : null;
      }

    return <div className="app">
    <Modal open={openSignup} onClose={()=> setOpenSignup(false)}>
    <form className="app__signUp">
             <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary__button" type="submit" onClick={signUp}>
              Sign up
            </button>
          </form>
    </Modal>
    <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
           <form className="app__signUp">
             <input
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary__button" type="submit" onClick={login}>
              Log in
            </button>
          </form>
      </Modal>
   <div className="app__header">
      <div className="app__headerWrapper">
      <img src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram original logo"/>
      {user ? (
      <button className="text__button" onClick={()=> auth.signOut()}>Logout</button>
      ) : (
        <div className="app__headerButtons">
        <button className="primary__button" onClick={() => setOpenLogin(true) || setOpenSignup(false)}>Log in</button>
        <button className="text__button" onClick={() => setOpenSignup(true) || setOpenLogin(false)}>Sign Up</button>
      </div>
      )}
      </div>
    </div>
    <UserDisplayName user={user} />

    <div className="timeline">
      {user && <ImageUpload user={user} />}
      {
        posts.map(({id,post}) =>(
          <Post key={id} {...post} user={user} postId={id}/>
        ))
      }
    </div>
   </div>
}
export default Home;
