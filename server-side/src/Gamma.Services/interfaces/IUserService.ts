import { HttpError } from "../../Gamma.Common/models/httpError";
import { User } from "../../Gamma.Models/Identities/user";
import { ILoginUserViewModel } from "../../Gamma.Models/ViewModels/loginUserViewModel";
import { ISignUpUserViewModel } from "../../Gamma.Models/ViewModels/signUpUserViewModel";

export interface IUserService {
  Signup: (newUser: ISignUpUserViewModel) => Promise<User | HttpError>;
  Login: (user: ILoginUserViewModel) => any;
  GetUserByEmail: (email: string) => Promise<User | HttpError>;
  GetUserByUsername: (username: string) => Promise<User | HttpError>;
  EmailExists(email: string): Promise<boolean>;
  UsernameExists(username: string): Promise<boolean>;
}
