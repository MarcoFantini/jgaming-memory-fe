import {createAction, props} from '@ngrx/store';
import {MemoryGameJSON} from './model/memory-game.model';
import {MemoryInstance, MemoryInstanceJSON} from './model/memory-instance.model';
import {AckJSON} from '../../model/ack.model';

export const getAllInstances = createAction(
  '[MemoryInstance] Get All Instances',
);

export const getAllInstancesSuccess = createAction(
  '[MemoryInstance] Get All Instances Success',
  props<{ instances: MemoryInstanceJSON[] }>()
);

export const saveInstance = createAction(
  '[MemoryInstance] Save Instance',
  props<{ instance: MemoryInstance }>()
);

export const saveInstanceSuccess = createAction(
  '[Ack] Save Instance Success',
  props<{ ack: AckJSON }>()
);

export const deleteInstance = createAction(
  '[Memory] Delete Instance',
  props<{ id: number }>()
);

export const deleteInstanceSuccess = createAction(
  '[Memory] Delete Instance Success',
  props<{ instance: MemoryInstanceJSON }>()
);

export const getGame = createAction(
  '[Memory] Get Game',
  props<{ id: number }>()
);

export const getGameSuccess = createAction(
  '[Memory] Get Game Success',
  props<{ game: MemoryGameJSON }>()
);

export const editInstance = createAction(
  '[Memory] Edit Instance',
  props<{ instance: MemoryInstance }>()
);

export const editInstanceSuccess = createAction(
  '[Ack] Edit Instance Success',
  props<{ ack: AckJSON }>()
);

export const clean = createAction(
  '[Memory] Clean Memory'
);
