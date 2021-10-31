import {createAction, props} from '@ngrx/store';
import {Storage} from './model/storage.model';

export const getStorage = createAction(
    '[Storage] Get Storage'
);

export const getStorageSuccess = createAction(
    '[Storage] Get Storage Success',
    props<{ storage: Storage }>()
);

export const saveStorage = createAction(
    '[Storage] Save Storage',
    props<{ storage: Storage }>()
);
