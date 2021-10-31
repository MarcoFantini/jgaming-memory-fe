import {ActiveModel, Validator} from '../../../model/active.model';
import {MemoryInstanceJSON} from './memory-instance.model';

export interface MemoryGussetJSON {
  id: number;
  name: string;
}

const validator = new Validator(
  'Gusset',
  ['id', 'name'],
  ['id', 'name'],
);

export class MemoryGusset extends ActiveModel {
  id: number;
  name: string;

  constructor(response: MemoryInstanceJSON) {
    super(response, validator);
  }

  static toJSON(gusset: MemoryGusset) {
    return gusset as MemoryGussetJSON;
  }

}
