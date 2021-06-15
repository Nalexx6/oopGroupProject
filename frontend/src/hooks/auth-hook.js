import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setUserId(uid);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  return { login, logout, userId };
};