import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { githubActions } from '../store/github/github.slice';
import { themeActions } from '../features/counter/theme-slice';

const actions = {
  ...githubActions,
  ...themeActions,
};

export const useActions = (): any => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
