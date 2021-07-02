export interface ILoginUserViewModel {
  Email: string;
  Password: string;
  displayName?: string;
  username?: string;
}

export class LoginUserViewModel implements ILoginUserViewModel {
  constructor(email: string, password: string) {
    this.Email = email;
    this.Password = password;
  }
  Email: string;
  Password: string;
}
