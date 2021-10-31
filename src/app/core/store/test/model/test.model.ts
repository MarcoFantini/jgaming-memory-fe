import {ActiveModel, Validator} from '../../../model/active.model';

export interface TestJSON {
  id: string;
  name: string;
}

const validator = new Validator(
    'Test',
    ['id', 'name'],
    ['id', 'name']
);

export class Test extends ActiveModel {
  id: string;
  name: string;

  constructor(response: TestJSON) {
    super(response, validator);
  }

  static toJSON(model: Test): TestJSON {
    return model as TestJSON;
  }
}
