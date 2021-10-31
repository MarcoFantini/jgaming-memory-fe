import {createAction, props} from '@ngrx/store';
import {RankJSON} from './model/rank.model';
import {GameType} from '../../enums/game-type.enum';
import {RankUpdate, RankUpdateJSON} from './model/rank-update.model';

export const getAllRanks = createAction(
    '[Rank] Get All Ranks',
    props<{ gameType: GameType }>()
);

export const getAllRanksSuccess = createAction(
    '[Rank] Get All Ranks Success',
    props<{ ranks: RankJSON[] }>()
);

export const saveRank = createAction(
  '[RankUpdate] Rank Test',
  props<{ rankUpdate: RankUpdate }>()
);

export const saveRankSuccess = createAction(
  '[RankUpdate] Save Rank Success',
  props<{ rankUpdate: RankUpdateJSON }>()
);

export const clean = createAction(
    '[Rank] Clean Ranks'
);
