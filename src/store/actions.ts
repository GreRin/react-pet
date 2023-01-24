import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { githubActions } from './github/github.slice';
import { themeActions } from '../features/counter/theme-slice';
import { songAction } from './songs/songs.slice';
import { carsAction } from './cars/cars.slice';
import { formActions } from './cars/form.slice';
import { userAction } from './users/user.slice';

const actions = {
  ...githubActions,
  ...themeActions,
  ...songAction,
  ...carsAction,
  ...formActions,
  ...userAction,
};

export const useActions = (): any => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
