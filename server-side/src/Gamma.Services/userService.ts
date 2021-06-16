import { inject, injectable } from "inversify";
import { BaseService } from "./baseService";
import TYPES from "../Gamma.Constants/types";
import { IUserService } from "./interfaces/IUserService";
import { ISignUpUserViewModel, SignUpUserViewModel } from "../Gamma.Models/ViewModels/signUpUserViewModel";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/loginUserViewModel";
import { IUserRepository } from "../Gamma.DataAccess/userRepository";
import { User } from "../Gamma.Models/Identities/user";
import { HttpError } from "../Gamma.Common/models/httpError";
const jwt = require('jsonwebtoken');

@injectable()
export class UserService extends BaseService implements IUserService {
  constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    super();
  }

  public async Signup(candidateUser: ISignUpUserViewModel): Promise<User> {

    if (candidateUser.Password !== candidateUser.ConfirmPassword) {
      throw (new HttpError("Password and ConfirmPassword are not equal.", 422));
    }

    if ((await this.EmailExists(candidateUser.Email))) {
      throw (new HttpError("User exists already, please login instead.", 422));
    }
    if ((await this.UsernameExists(candidateUser.UserName))) {
      throw (new HttpError("Username exists already, please select another username.", 422));
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

  public async GetUserByEmail(email: string): Promise<User> {
    return this.userRepository.GetUserByEmail(email);
  }

  public async GetUserByUsername(username: string): Promise<User> {
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

  public async GenerateToken(userId: number, email: string, secretKey: string = 'supersecret_dont_share', expiresIn: string = '1h') {

    let token;
    try {
      token = jwt.sign({ userId: userId, email: email }, secretKey, { expiresIn: expiresIn });
    } catch (err) {
      throw (new HttpError('Signing up failed, please try again later.', 500));
    }
  }

}
