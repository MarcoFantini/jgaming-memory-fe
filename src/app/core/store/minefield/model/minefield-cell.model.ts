import {ActiveModel, Validator} from '../../../model/active.model';

export interface MinefieldCellJSON {
  treasure: boolean;
  bomb: boolean;
}

const validator = new Validator(
  'Minefield Cell',
  ['treasure', 'bomb'],
  ['treasure', 'bomb'],
);

export class MinefieldCell extends ActiveModel {
  treasure: boolean;
  bomb: boolean;

  constructor(response: MinefieldCell) {
    super(response, validator);
  }

}
