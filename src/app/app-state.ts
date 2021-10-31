import * as fromStorageReducer from './core/store/storage/storage.reducer';
import * as fromTestReducer from './core/store/test/test.reducer';
import * as fromRankReducer from './core/store/rank/rank.reducer';
import * as fromUserReducer from './core/store/user/user.reducer';
import * as fromBlackJackReducer from './core/store/blackjack/black-jack.reducer';
import * as fromContactReducer from './core/store/contact/contact.reducer';
import * as fromMinefieldReducer from './core/store/minefield/minefield.reducer';
import * as fromMemoryReducer from './core/store/memory/memory.reducer';
import * as fromCoreReducer from './core/store/core/core.reducer';
import {RouterReducerState} from '@ngrx/router-store';

export interface AppState {
  core: fromCoreReducer.CoreState;
  test: fromTestReducer.TestState;
  storage: fromStorageReducer.StorageState;
  router: RouterReducerState;
  rank: fromRankReducer.RankState;
  user: fromUserReducer.UserState;
  contact: fromContactReducer.ContactState;
  blackjack: fromBlackJackReducer.BlackJackState;
  minefield: fromMinefieldReducer.MinefieldState;
  memory: fromMemoryReducer.MemoryState;
}
