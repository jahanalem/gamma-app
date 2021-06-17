import { injectable } from "inversify";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/loginUserViewModel";
import { ISignUpUserViewModel } from "../Gamma.Models/ViewModels/signUpUserViewModel";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { IUser, User } from "../Gamma.Models/Identities/user";
import { HttpError } from "../Gamma.Common/models/httpError";
import { HTTPStatusCodes } from "../Gamma.Common/constants/HTTPStatusCodes";
const bcrypt = require("bcryptjs");

export interface IUserRepository {
  CreateUser: (newUser: IUser, password: string) => Promise<User>;
  LogInUser: (user: ILoginUserViewModel) => any;
  GetUserByEmail: (email: string) => Promise<User>;
  GetUserByUserName: (userName: string) => Promise<User>;
}
@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {

  constructor() {
    super();
  }

  public async CreateUser(newUser: IUser, password: string): Promise<User> {

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      throw (new HttpError("Could not create user, please try again.", HTTPStatusCodes.ServerError.InternalServerError));
    }

    const result = await ApplicationDbContext.Prisma.user.create({
      data: {
        Email: newUser.Email,
        NormalizedEmail: newUser.NormalizedEmail,
        UserName: newUser.UserName,
        NormalizedUserName: newUser.NormalizedUserName,
        FirstName: newUser.FirstName,
        LastName: newUser.LastName,
        IsActive: newUser.IsActive,
        PasswordHash: hashedPassword
      },
    })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  public async LogInUser(user: ILoginUserViewModel) { }

  public async GetUserByEmail(email: string): Promise<User> {
    const result = await ApplicationDbContext.Prisma.user
      .findFirst({
        where: { Email: email },
      }).catch(e => {
        throw (e);
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  public async GetUserByUserName(userName: string): Promise<User> {
    const result = await ApplicationDbContext.Prisma.user
      .findFirst({
        where: { UserName: userName },
      }).catch(e => {
        throw (e);
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }
}
