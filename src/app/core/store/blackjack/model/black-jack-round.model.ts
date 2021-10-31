import {Validator} from '../../../model/active.model';

export interface BlackJackRoundJSON {
  gamePhase: string;
  roundNumber: number;
  pot: number;
}

const validator = new Validator(
  'Round',
  ['roundNumber', 'pot'],
  ['roundNumber', 'pot'],
);

export class BlackJackRound {
  roundNumber: number;
  pot: number;

  /*constructor(response: RoundJSON) {
    super(response, validator);
  }*/

  static toJSON(round: BlackJackRound) {
    return round as BlackJackRoundJSON;
  }

}
