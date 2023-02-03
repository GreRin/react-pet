import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

const useThunk = (thunk: any): any => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(
    (arg: any) => {
      setIsLoading(true);
      dispatch(thunk)
        .unwrap()
        .catch((err: any) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};

export default useThunk;
