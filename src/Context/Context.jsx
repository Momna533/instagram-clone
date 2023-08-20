import { useContext } from "react";
import React from "react";
import {useState} from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts,setPosts] = useState([]);
  const [user, setUser] = useState(null);
  return <AppContext.Provider value={{openSignup,setOpenSignup,openLogin,setOpenLogin,username,setUsername,email,setEmail,password,setPassword,posts,setPosts,user,setUser}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
