import {createSelector} from '@ngrx/store';
import {AppState} from '../../../app-state';
import {MemoryState} from './memory.reducer';
import {MemoryInstance} from './model/memory-instance.model';
import {MemoryGame} from './model/memory-game.model';
import {Ack} from '../../model/ack.model';

const root = (state: AppState): MemoryState => state.memory;

export const getInstances = createSelector(
  root,
  (state: MemoryState): MemoryInstance[] => state.instances
);

export const getGame = createSelector(
  root,
  (state: MemoryState): MemoryGame => state.game
);

export const check = createSelector(
  root,
  (state: MemoryState): Ack => state.ack
);
