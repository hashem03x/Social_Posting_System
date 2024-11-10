import { useState } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const USER_ID_KEY = "user_id";

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem(USERNAME_KEY));
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [userID, setUserID] = useState(localStorage.getItem(USER_ID_KEY));

  const login = (username, token , userID) => {
    setUsername(username);
    setToken(token);
    setUserID(userID)
    // Save the username and token to local storage for persistence
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, userID);
  };

  const logout = () => {
    window.localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    setUsername(null);
    setToken(null);
    setUserID(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ username, userID, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
