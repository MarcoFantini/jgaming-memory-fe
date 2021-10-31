import {ErrorType} from '../enums/error-type.enum';

export class Error {
  type: ErrorType;
  message: string;

  constructor(error: any) {
    this.type = error.type;
    this.message = error.message;
  }

}
