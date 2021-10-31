import {TestEffects} from './core/store/test/test.effects';
import {RankEffects} from './core/store/rank/rank.effects';
import {UserEffects} from './core/store/user/user.effects';
import {ContactEffects} from './core/store/contact/contact.effects';
import {MinefieldEffects} from './core/store/minefield/minefield.effects';
import {MemoryEffects} from './core/store/memory/memory.effects';
import {BlackJackEffects} from './core/store/blackjack/black-jack.effects';
import {CoreEffects} from './core/store/core/core.effects';

export const effects = [
  CoreEffects,
  TestEffects,
  RankEffects,
  UserEffects,
  ContactEffects,
  BlackJackEffects,
  MinefieldEffects,
  MemoryEffects
];
