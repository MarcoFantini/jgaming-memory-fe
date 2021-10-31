import {createReducer, on} from '@ngrx/store';
import * as StorageActions from '../storage/storage.actions';
import {Storage} from './model/storage.model';

export interface StorageState {
  storage: Storage;
}

export const initialState: StorageState = {
  storage: new Storage()
};

const reducer = createReducer(
  initialState,
  on(StorageActions.getStorageSuccess, (state, action) => {
    return {
      ...state,
      storage: action.storage
    };
  }),
);

export function storageReducer(state: StorageState | undefined, action) {
  return reducer(state, action);
}
