import { useState } from 'react';

export const useAuth = () => {
  let userId = null;

  const login = (uid) => {
    userId = uid;
  };

  const logout = () => {
    userId = null;
  };

  return { login, logout, userId };
};