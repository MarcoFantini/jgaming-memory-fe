import {ActiveModel, Validator} from '../../../model/active.model';
import {Role} from '../../../enums/role.enum';

export interface UserJSON {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  presentation: string;
  role: Role;
  token: string;
}

const userValidator = new Validator(
  'User',
  ['id', 'username', 'email', 'password', 'avatar', 'presentation', 'role', 'token', 'authorities', 'accountNonExpired',
  'accountNonLocked', 'credentialsNonExpired', 'enabled'],
  ['id', 'username', 'email', 'password', 'avatar', 'presentation', 'role', 'token']
);

export class User extends ActiveModel {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  presentation: string;
  role: Role;
  token: string;

  constructor(response: UserJSON) {
    super(response, userValidator);
  }

  static toJSON(model: User): UserJSON {
    return model as UserJSON;
  }

}
