import { useCallback } from 'react';

export const useMessageHandler = (): any => {
  return useCallback((text: string) => {
    return text;
  }, []);
};
