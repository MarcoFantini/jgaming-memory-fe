import {ActiveModel, Validator} from '../../../model/active.model';
import {GameType} from '../../../enums/game-type.enum';


export interface RankUpdateJSON {
  userId: number;
  gameType: GameType;
  result: boolean;
  victoryPoints: number;
}

const validator = new Validator(
  'RankUpdate',
  ['userId', 'gameType', 'result', 'victoryPoints'],
  ['userId', 'gameType', 'result', 'victoryPoints']
);

export class RankUpdate extends ActiveModel {
  userId: number;
  gameType: GameType;
  result: boolean;
  victoryPoints: number;

  constructor(response: RankUpdateJSON) {
    super(response, validator);
  }

  static toJSON(model: RankUpdate): RankUpdateJSON {
    return model as RankUpdateJSON;
  }
}
