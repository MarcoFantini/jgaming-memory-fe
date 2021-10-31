import {createAction, props} from '@ngrx/store';
import {GameType} from '../../enums/game-type.enum';

export const changeGame = createAction(
  '[Core] Change Game',
  props<{ gameType: GameType }>()
);
