import { useState, useCallback, SetStateAction, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const storageName: string = 'userData';

export const useAuth = (): any => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback(
    (jwtToken: SetStateAction<string | null>, id: SetStateAction<string | null>) => {
      setToken(jwtToken);
      setUserId(id);

      localStorage.setItem(storageName, JSON.stringify({ userId, token }));
    },
    [token, userId]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useDeepCompareEffect((): void => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}');

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
