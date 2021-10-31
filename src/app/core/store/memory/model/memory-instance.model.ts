import {ActiveModel, Validator} from '../../../model/active.model';

export interface MemoryInstanceJSON {
  id: number;
  name: string;
  columns: number;
  rows: number;
  maxErrors: number;
  victoryPoints: number;
  timer: number;
}

const validator = new Validator(
  'MemoryInstance',
  ['id', 'name', 'columns', 'rows', 'maxErrors', 'victoryPoints', 'timer'],
  ['id', 'name', 'columns', 'rows', 'maxErrors', 'victoryPoints', 'timer']
);

export class MemoryInstance extends ActiveModel {
  id: number;
  name: string;
  columns: number;
  rows: number;
  maxErrors: number;
  victoryPoints: number;
  timer: number;

  constructor(response: MemoryInstanceJSON) {
    super(response, validator);
  }

  static toJSON(model: MemoryInstance): MemoryInstanceJSON {
    return model as MemoryInstanceJSON;
  }
}
