import { useState, useCallback, useEffect } from 'react';

const storageName: string = 'userData';

export const useAuth = (): any => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [messageData, setMessageData] = useState<string | null>(null);
  const [statusData, setStatus] = useState<number | null>(null);

  const login = useCallback((jwtToken: string, id: string, message: string, status: number) => {
    setToken(jwtToken);
    setUserId(id);
    setMessageData(message);
    setStatus(status);
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken, messageData: message, statusData: status })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setMessageData(null);
    setStatus(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect((): void => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}');

    if (data && data.token) {
      login(data.token, data.userId, data.message, data.status);
    }
  }, [login]);

  return { login, logout, token, userId, messageData, statusData };
};
