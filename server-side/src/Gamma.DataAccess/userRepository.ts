import { injectable } from "inversify";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/LoginUserViewModel";
import { ISignUpUserViewModel } from "../Gamma.Models/ViewModels/signUpUserViewModel";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";

export interface IUserRepository {
  CreateUser: (newUser: ISignUpUserViewModel) => any;
  LogInUser: (user: ILoginUserViewModel) => any;
}
@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
  constructor() {
    super();
  }
  public async CreateUser(newUser: ISignUpUserViewModel) {}

  public async LogInUser(user: ILoginUserViewModel) {}
}
