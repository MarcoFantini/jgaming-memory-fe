import {createReducer, on} from '@ngrx/store';
import * as MemoryInstancesActions from './memory.actions';
import {MemoryInstance} from './model/memory-instance.model';
import {MemoryGame} from './model/memory-game.model';
import {Ack} from '../../model/ack.model';

export interface MemoryState {
  instances: MemoryInstance[];
  game: MemoryGame;
  ack: Ack;
}

export const initialState: MemoryState = {
  instances: [],
  game: null,
  ack: null
};

const reducer = createReducer(
  initialState,
  on(MemoryInstancesActions.getAllInstancesSuccess, (state, action) => {
    return {
      ...state,
      instances: [...action.instances.map(value => new MemoryInstance(value))]
    };
  }),
  on(MemoryInstancesActions.saveInstanceSuccess, (state, action) => {
    return {
      ...state,
      ack: new Ack(action.ack)
    };
  }),
  on(MemoryInstancesActions.getGameSuccess, (state, action) => {
    return {
      ...state,
      game: new MemoryGame(action.game)
    };
  }),
  on(MemoryInstancesActions.deleteInstanceSuccess, (state, action) => {
    return {
      ...state,
      instances: [...state.instances.filter(value => value.id !== action.instance.id)]
    };
  }),
  on(MemoryInstancesActions.editInstanceSuccess, (state, action) => {
    return {
      ...state,
      ack: new Ack(action.ack)
    };
  }),
  on(MemoryInstancesActions.clean, (state) => {
    return {
      ...state,
      instances: [],
      game: null,
      ack: null
    };
  })
);

export function memoryReducer(state: MemoryState | undefined, action) {
  return reducer(state, action);
}
