import { Role } from './../Gamma.Models/Identities/role';
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
import jwt from 'jsonwebtoken';
import { USERROLES } from "../Gamma.Constants/roleMembers";
import { GammaToken } from "../global";
import { IRoleRepository } from "../Gamma.DataAccess/roleRepository";
const bcrypt = require("bcryptjs");

@injectable()
export class UserService extends BaseService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IRoleRepository) private roleRepository: IRoleRepository
  ) {
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
      Id: candidateUser.Id,
      Email: candidateUser.Email,
      UserName: candidateUser.UserName,
      FirstName: candidateUser.FirstName,
      LastName: candidateUser.LastName,
      IsActive: true,
    });

    if (!candidateUser.UserRoleName.trim())
      candidateUser.UserRoleName = USERROLES.CONTRIBUTOR;
    if (candidateUser.UserRoleName.trim().toUpperCase() !== USERROLES.CONTRIBUTOR &&
      candidateUser.UserRoleName.trim().toUpperCase() !== USERROLES.ADMINISTRATOR) {

      throw (new HttpError(`Invalid credentials, could not assign this role to the user because there isn't.`,
        HTTPStatusCodes.ClientError.Forbidden));
    }

    const result = await this.userRepository.CreateUser(createdUser,
      candidateUser.Password,
      candidateUser.UserRoleName);

    const gammaToken: GammaToken = {
      userId: result.Id,
      email: result.Email,
      roleName: candidateUser.UserRoleName,
      userName: result.UserName,
      firstName: result.FirstName,
      lastName: result.LastName,
      secretKey: process.env.SECRET_KEY,
      expiresIn: '24h',
    }

    result.Token = await this.GenerateToken(gammaToken);

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
    try { isValidPassword = await bcrypt.compare(userModel.Password, existingUser.PasswordHash); }
    catch (err) { throw (new HttpError('Could not log you in, please check your credentials and try again.', HTTPStatusCodes.ServerError.InternalServerError)); }

    if (!isValidPassword)
      throw (new HttpError('Invalid credentials, could not log you in.', HTTPStatusCodes.ClientError.Forbidden));
    
    const gammaToken: GammaToken = {
      userId: existingUser.Id,
      email: existingUser.Email,
      roleName: (existingUser.Roles[0] as any).Role.NormalizedName,
      userName: existingUser.UserName,
      firstName: existingUser.FirstName,
      lastName: existingUser.LastName,
      secretKey: process.env.SECRET_KEY,
      expiresIn: '24h',
    }

    const token = await this.GenerateToken(gammaToken);

    existingUser.Token = token;

    return existingUser;
  }


  public async GetByCriteria(): Promise<User[]> {
    return await this.userRepository.GetByCriteria();
  }


  public async EditUser() { }


  public async GetUsers() { }


  public async DeleteUser(id: string) { }


  private async GenerateToken(gToken: GammaToken): Promise<string> {

    let token;
    try {
      token = jwt.sign(
        {
          userId: gToken.userId,
          email: gToken.email,
          roleName: gToken.roleName,
          firstName: gToken.firstName,
          lastName: gToken.lastName
        }
        , gToken.secretKey,
        { expiresIn: gToken.expiresIn });

    } catch (err) {
      throw (new HttpError('Signing up failed, please try again later.', HTTPStatusCodes.ServerError.InternalServerError));
    }

    return token;
  }
}
