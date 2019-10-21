import React, { useState, useEffect, createContext } from "react";
import Spinner from "./components/UI/Spinner";
import { firebase } from "./firebase";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitiallyLoading, setIsInitiallyLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsInitiallyLoading(false);
    });
  }, []);

  return isInitiallyLoading ? (
    <Spinner />
  ) : (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
