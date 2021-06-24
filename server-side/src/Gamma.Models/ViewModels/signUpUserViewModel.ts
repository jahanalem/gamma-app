import { USERROLES } from "../../Gamma.Constants/roleMembers";


export interface ISignUpUserViewModel {
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  UserRole?: string;
}

export class SignUpUserViewModel implements ISignUpUserViewModel {
  constructor(
    firstName: string = null,
    lastName: string = null,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
    userRole: string = USERROLES.Contributor
  ) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.UserName = userName;
    this.Email = email;
    this.Password = password;
    this.ConfirmPassword = confirmPassword;
    this.UserRole = userRole;
  }
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  UserRole?: string;
}
