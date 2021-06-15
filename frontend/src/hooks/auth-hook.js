import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
  const [userId, setUserId] = useState(false);

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
    setToken(null);
    localStorage.removeItem('userData');
  }, []);

  return { login, logout, userId };
};