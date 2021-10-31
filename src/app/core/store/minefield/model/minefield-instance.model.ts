import {ActiveModel, Validator} from '../../../model/active.model';
import {Level} from '../../../enums/level.enum';

export interface MinefieldInstanceJSON {
  id: number;
  name: string;
  columns: number;
  bombs: number;
  treasures: number;
  life: number;
  level: Level;
}

const validator = new Validator(
  'MinefieldInstance',
  ['id', 'name', 'columns', 'bombs', 'treasures', 'life', 'level'],
  ['id', 'name', 'columns', 'bombs', 'treasures', 'life', 'level']
);

export class MinefieldInstance extends ActiveModel {
  id: number;
  name: string;
  columns: number;
  bombs: number;
  treasures: number;
  life: number;
  level: Level;

  constructor(response: MinefieldInstanceJSON) {
    super(response, validator);
  }

  static toJSON(model: MinefieldInstance): MinefieldInstanceJSON {
    return model as MinefieldInstanceJSON;
  }
}
