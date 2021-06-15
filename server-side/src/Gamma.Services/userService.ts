import { BaseService } from "./baseService";
import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { IUserService } from "./interfaces/IUserService";
import {
  ISignUpUserViewModel,
  SignUpUserViewModel,
} from "../Gamma.Models/ViewModels/signUpUserViewModel";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/LoginUserViewModel";
import { IUserRepository } from "../Gamma.DataAccess/userRepository";

@injectable()
export class UserService extends BaseService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {
    super();
  }
  public async Signup(candidateUser: ISignUpUserViewModel) {
    if (candidateUser.Password !== candidateUser.ConfirmPassword) {
      return;
    }
  }

  public async Login(user: ILoginUserViewModel) {}

  public async EditUser() {}

  public async GetUsers() {}

  public async DeleteUser(id: number) {}
}
