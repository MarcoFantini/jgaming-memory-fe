import * as CoreActions from './core.actions';
import {createReducer, on} from '@ngrx/store';
import {GameType} from '../../enums/game-type.enum';

export interface CoreState {
    gameType: GameType;
}

export const initialState: CoreState = {
    gameType: GameType.HOME
};

const reducer = createReducer(
    initialState,
    on(CoreActions.changeGame, (state, action) => {
        return {
            gameType: action.gameType
        };
    }),
);

export function coreReducer(state: CoreState | undefined, action) {
    return reducer(state, action);
}
