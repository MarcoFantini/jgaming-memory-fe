import {createSelector} from '@ngrx/store';
import {StorageState} from './storage.reducer';
import {AppState} from '../../../app-state';
import {Storage} from './model/storage.model';

const root = (state: AppState): StorageState => state.storage;

export const getStorage = createSelector(
  root,
  (state: StorageState): Storage => state.storage
);
