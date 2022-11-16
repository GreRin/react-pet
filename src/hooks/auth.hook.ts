import { useState, useCallback, useEffect } from 'react';

export const useAuth = (): any => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [messageData, setMessageData] = useState<string | null>(null);
  const [statusData, setStatus] = useState<number | null>(null);

  const login = useCallback((jwtToken: string, id: string, message: string, status: any) => {
    setAccessToken(jwtToken);
    setUserId(id);
    setMessageData(message);
    setStatus(status);

    localStorage.setItem('userId', id);
    localStorage.setItem('accessToken', jwtToken);
    localStorage.setItem('messageData', message);
    localStorage.setItem('statusData', status);
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setUserId(null);
    setMessageData(null);
    setStatus(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('messageData');
    localStorage.removeItem('statusData');
  }, []);

  useEffect((): void => {
    const id = localStorage.getItem('userId') || '';
    const token = localStorage.getItem('accessToken') || '';
    const message = localStorage.getItem('messageData') || '';
    const status = localStorage.getItem('statusData') || '';

    if (accessToken) {
      login(id, token, message, status);
    }
  }, [login]);

  return { login, logout, accessToken, userId, messageData, statusData };
};
