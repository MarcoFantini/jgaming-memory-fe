import {ActiveModel, Validator} from '../../../model/active.model';
import {MemoryGusset, MemoryGussetJSON} from './memory-gusset.model';

export interface MemoryGameJSON {
  name: string;
  gussets: MemoryGussetJSON[][];
  maxErrors: number;
  victoryPoints: number;
  columns: number;
  rows: number;
  timer: number;
}

const validator = new Validator(
  'Game',
  ['name', 'gussets', 'maxErrors', 'victoryPoints', 'columns', 'rows', 'timer'],
  ['name', 'gussets', 'maxErrors', 'victoryPoints', 'columns', 'rows', 'timer'],
);

export class MemoryGame extends ActiveModel {
  name: string;
  gussets: MemoryGusset[][];
  maxErrors: number;
  victoryPoints: number;
  columns: number;
  rows: number;
  timer: number;

  constructor(response: MemoryGameJSON) {
    super(response, validator);
  }

  static toJSON(game: MemoryGame) {
    return game as MemoryGameJSON;
  }
}
