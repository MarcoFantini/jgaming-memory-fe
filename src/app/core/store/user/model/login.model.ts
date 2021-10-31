export interface LoginJSON {
  username: string;
  password: string;
}

export class Login {
  username: string;
  password: string;

  static toJSON(login: Login) {
    return login as LoginJSON;
  }

}
