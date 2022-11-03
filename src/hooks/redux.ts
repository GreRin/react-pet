import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

export const useHubSelector: TypedUseSelectorHook<RootState> = useSelector;
