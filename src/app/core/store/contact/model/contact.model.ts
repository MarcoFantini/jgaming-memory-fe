import {ActiveModel, Validator} from '../../../model/active.model';

export interface ContactJSON {
  email: string;
  object: string;
  message: string;
}

const validator = new Validator(
  'Contact',
  ['email', 'object', 'message'],
  ['email', 'object', 'message']
);

export class Contact extends ActiveModel {
  email: string;
  object: string;
  message: string;

  constructor(response: ContactJSON) {
    super(response, validator);
  }

  static toJSON(contact: Contact): ContactJSON {
    return contact as ContactJSON;
  }
}
