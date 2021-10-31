import {createSelector} from '@ngrx/store';
import {AppState} from '../../../app-state';
import {RankState} from './rank.reducer';
import {Rank} from './model/rank.model';

const root = (state: AppState): RankState => state.rank;

export const getRanks = createSelector(
  root,
  (state: RankState): Rank[] => state.ranks
);
