import { useCallback, useEffect, useState } from 'react';

export const useTableData = (): any => {
  const [resp, setResponces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData(): Promise<any> {
      setLoading(true);
      try {
        const res = await fetch('https://api.thedogapi.com/v1/breeds?limit=10');
        const data = await res.json();
        setResponces(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return { resp, loading, error };
};
