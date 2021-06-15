import { ILoginUserViewModel } from "../../Gamma.Models/ViewModels/LoginUserViewModel";
import { ISignUpUserViewModel } from "../../Gamma.Models/ViewModels/signUpUserViewModel";

export interface IUserService {
  Signup: (newUser: ISignUpUserViewModel) => any;
  Login: (user: ILoginUserViewModel) => any;
}
