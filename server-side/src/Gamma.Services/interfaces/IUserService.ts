import { HttpError } from "../../Gamma.Common/models/httpError";
import { User } from "../../Gamma.Models/Identities/user";
import { ILoginUserViewModel } from "../../Gamma.Models/ViewModels/loginUserViewModel";
import { ISignUpUserViewModel } from "../../Gamma.Models/ViewModels/signUpUserViewModel";

export interface IUserService {
  Signup: (newUser: ISignUpUserViewModel) => Promise<User>;
  Login: (user: ILoginUserViewModel) => Promise<User>;
  GetUserByEmail: (email: string) => Promise<User>;
  GetUserByUsername: (username: string) => Promise<User>;
  EmailExists(email: string): Promise<boolean>;
  UsernameExists(username: string): Promise<boolean>;
  GetAll: () => Promise<User[]>;
}
