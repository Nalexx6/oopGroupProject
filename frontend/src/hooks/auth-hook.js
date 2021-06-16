import { useState } from 'react';

export const useAuth = () => {
  const[userId, setUserId] = useState(null);
  const getUserId = () => {
    return localStorage.getItem('userId')
  }
  const login = (uid) => {
    console.log("djsfhds")
    setUserId(uid);
    localStorage.setItem('userId',uid);
    console.log(userId)
  };

  const logout = () => {
    localStorage.removeItem('userData');
    userId = null;
  };
  return { login, logout, getUserId };
};