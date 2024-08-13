import React, { createContext, useContext, useState } from 'react';
// Create a context for authentication with default values
export const AuthContext = createContext({
  isLoggedIn: false, // Default value for whether the user is logged in
  login: () => { }, // Default login function
  logout: () => { }, // Default logout function
});
// Create a provider component for the AuthContext
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  // Function to log in (sets isLoggedIn to true)
  const login = () => setIsLoggedIn(true);
  // Function to log out (sets isLoggedIn to false)
  const logout = () => setIsLoggedIn(false);
  return (
    // Provide the isLoggedIn state and login/logout functions to the AuthContext
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const auth = useContext(AuthContext); // Access the AuthContext
  return auth; // Return the context value (isLoggedIn, login, logout)
};