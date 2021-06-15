import { BaseService } from "./baseService";
import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { IUserService } from "./interfaces/IUserService";
import { ISignUpUserViewModel, SignUpUserViewModel } from "../Gamma.Models/ViewModels/signUpUserViewModel";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/loginUserViewModel";
import { IUserRepository } from "../Gamma.DataAccess/userRepository";
import { User } from "../Gamma.Models/Identities/user";
import { HttpError } from "../Gamma.Common/models/httpError";

@injectable()
export class UserService extends BaseService implements IUserService {
  constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    super();
  }
  public async Signup(candidateUser: ISignUpUserViewModel): Promise<User | HttpError> {

    if (candidateUser.Password !== candidateUser.ConfirmPassword) {
      const error = new HttpError("Password and ConfirmPassword are not equal.", 422);

      return await Promise.resolve(error);
    }

    if ((await this.EmailExists(candidateUser.Email))) {
      const error = new HttpError("User exists already, please login instead.", 422);

      return await Promise.resolve(error);
    }
    if ((await this.UsernameExists(candidateUser.UserName))) {
      const error = new HttpError("Username exists already, please select another username.", 422);

      return await Promise.resolve(error);
    }

    const createdUser = new User({
      Email: candidateUser.Email,
      UserName: candidateUser.UserName,
      FirstName: candidateUser.FirstName,
      LastName: candidateUser.LastName,
      IsActive: true,
    });

    const result = await this.userRepository.CreateUser(createdUser, candidateUser.Password);

    return result;
  }

  public async GetUserByEmail(email: string): Promise<User | HttpError> {
    return this.userRepository.GetUserByEmail(email);
  }

  public async GetUserByUsername(username: string): Promise<User | HttpError> {
    return this.userRepository.GetUserByUserName(username);
  }

  public async EmailExists(email: string): Promise<boolean> {
    const user = await this.GetUserByEmail(email);

    return (user != null) ? true : false;
  }

  public async UsernameExists(username: string): Promise<boolean> {
    const user = await this.GetUserByUsername(username);

    return (user != null) ? true : false;
  }

  public async Login(user: ILoginUserViewModel) { }

  public async EditUser() { }

  public async GetUsers() { }

  public async DeleteUser(id: number) { }
}
