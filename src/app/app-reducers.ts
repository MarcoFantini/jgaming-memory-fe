import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app-state';
import {routerReducer} from '@ngrx/router-store';
import * as fromTestReducer from './core/store/test/test.reducer';
import * as fromStorageReducer from './core/store/storage/storage.reducer';
import * as fromRankReducer from './core/store/rank/rank.reducer';
import * as fromUserReducer from './core/store/user/user.reducer';
import * as fromBlackJackReducer from './core/store/blackjack/black-jack.reducer';
import * as fromContactReducer from './core/store/contact/contact.reducer';
import * as fromMinefieldReducer from './core/store/minefield/minefield.reducer';
import * as fromMemoryReducer from './core/store/memory/memory.reducer';
import * as fromCoreReducer from './core/store/core/core.reducer';

export const reducers: ActionReducerMap<AppState> = {
  core: fromCoreReducer.coreReducer,
  test: fromTestReducer.testReducer,
  storage: fromStorageReducer.storageReducer,
  router: routerReducer,
  rank: fromRankReducer.rankReducer,
  user: fromUserReducer.userReducer,
  contact: fromContactReducer.contactReducer,
  blackjack: fromBlackJackReducer.blackJackReducer,
  minefield: fromMinefieldReducer.minefieldReducer,
  memory: fromMemoryReducer.memoryReducer,
};
