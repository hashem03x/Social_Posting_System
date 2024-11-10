import { createContext, useContext } from "react";



export const AuthContext = createContext({username: null, userID:null,token: null, isAuthenticated: false, login: ()=>{}, logout: ()=>{}  });

export const useAuth = () => useContext(AuthContext)