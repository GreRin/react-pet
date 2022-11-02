import { useCallback, useState } from 'react';

export const useHttp = (): any => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customError, setError] = useState<string>('');

  const request = useCallback(async (url: RequestInfo | URL, method: string = 'GET', body: any, headers: any = {}): Promise<any> => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const responce = await fetch(url, {
        method,
        body,
        headers,
      });

      const data = await responce.json();

      if (!responce.ok) {
        throw new Error(data.message || 'Something goes wrong!');
      }
      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = (): void => setError('');

  return { loading, request, customError, clearError };
};
