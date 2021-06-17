import { inject, injectable } from "inversify";
import { BaseService } from "./baseService";
import TYPES from "../Gamma.Constants/types";
import { IUserService } from "./interfaces/IUserService";
import { ISignUpUserViewModel, SignUpUserViewModel } from "../Gamma.Models/ViewModels/signUpUserViewModel";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/loginUserViewModel";
import { IUserRepository } from "../Gamma.DataAccess/userRepository";
import { User } from "../Gamma.Models/Identities/user";
import { HttpError } from "../Gamma.Common/models/httpError";
import { HTTPStatusCodes } from "../Gamma.Common/constants/HTTPStatusCodes";
import { container } from "../inversify.config";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

@injectable()
export class UserService extends BaseService implements IUserService {
  constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    super();
  }

  public async Signup(candidateUser: ISignUpUserViewModel): Promise<User> {

    if (candidateUser.Password !== candidateUser.ConfirmPassword) {
      throw (new HttpError("Password and ConfirmPassword are not equal.", HTTPStatusCodes.ClientError.UnprocessableEntity));
    }

    if ((await this.EmailExists(candidateUser.Email))) {
      throw (new HttpError("User exists already, please login instead.", HTTPStatusCodes.ClientError.UnprocessableEntity));
    }
    if ((await this.UsernameExists(candidateUser.UserName))) {
      throw (new HttpError("Username exists already, please select another username.", HTTPStatusCodes.ClientError.UnprocessableEntity));
    }

    const createdUser = new User({
      Email: candidateUser.Email,
      UserName: candidateUser.UserName,
      FirstName: candidateUser.FirstName,
      LastName: candidateUser.LastName,
      IsActive: true,
    });

    const result = await this.userRepository.CreateUser(createdUser, candidateUser.Password);
    result.Token = await this.GenerateToken(result.Id, result.Email, process.env.SECRET_KEY);

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

  public async Login(userModel: ILoginUserViewModel): Promise<User> {

    let existingUser: User;
    try {
      existingUser = await this.userRepository.GetUserByEmail(userModel.Email);
    }
    catch (err) {
      throw (new HttpError('Logging in failed, please try again later.', HTTPStatusCodes.ServerError.InternalServerError));
    }

    if (!existingUser) {
      throw (new HttpError('Invalid credentials, could not log you in.', HTTPStatusCodes.ClientError.Forbidden));
    }

    let isValidPassword: boolean;
    try {
      isValidPassword = await bcrypt.compare(userModel.Password, existingUser.PasswordHash);
    }
    catch (err) {
      throw (new HttpError('Could not log you in, please check your credentials and try again.', HTTPStatusCodes.ServerError.InternalServerError));
    }

    if (!isValidPassword)
      throw (new HttpError('Invalid credentials, could not log you in.', HTTPStatusCodes.ClientError.Forbidden));

    const token = await this.GenerateToken(existingUser.Id, existingUser.Email, process.env.SECRET_KEY);

    existingUser.Token = token;

    return existingUser;
  }

  public async EditUser() { }

  public async GetUsers() { }

  public async DeleteUser(id: number) { }

  private async GenerateToken(userId: number,
    email: string,
    secretKey: string = process.env.SECRET_KEY,
    expiresIn: string = '1h'): Promise<string> {

    let token;
    try {
      token = jwt.sign({ userId: userId, email: email }, secretKey, { expiresIn: expiresIn });
    } catch (err) {
      throw (new HttpError('Signing up failed, please try again later.', HTTPStatusCodes.ServerError.InternalServerError));
    }

    return token;
  }

}
