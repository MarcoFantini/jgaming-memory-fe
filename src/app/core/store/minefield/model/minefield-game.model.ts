import {MinefieldCell, MinefieldCellJSON} from './minefield-cell.model';
import {ActiveModel, Validator} from '../../../model/active.model';
import {Level} from '../../../enums/level.enum';

export interface MinefieldGameJSON {
  name: string;
  cells: MinefieldCellJSON[][];
  life: number;
  treasures: number;
  columns: number;
  row: number;
  level: Level;
}

const validator = new Validator(
  'Minefield Game',
  ['name', 'cells', 'life', 'treasures', 'columns', 'row' , 'level'],
  ['name', 'cells', 'life', 'treasures', 'columns', 'row' , 'level'],
);

export class MinefieldGame extends ActiveModel {
  name: string;
  cells: MinefieldCell[][];
  life: number;
  treasures: number;
  columns: number;
  row: number;
  level: Level;


  constructor(response: MinefieldGameJSON) {
    super(response, validator);
    // TODO FIXME
  }
}
