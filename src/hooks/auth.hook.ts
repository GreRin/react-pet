import { useState, useCallback, useEffect } from 'react';

const storageName: string = 'userData';

export const useAuth = (): any => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback(
    (jwtToken: any, id: any) => {
      setToken(jwtToken);
      setUserId(id);
      localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }));
    },
    [token, userId]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect((): void => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}');

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
