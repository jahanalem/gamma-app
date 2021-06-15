import { injectable } from "inversify";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/loginUserViewModel";
import { ISignUpUserViewModel } from "../Gamma.Models/ViewModels/signUpUserViewModel";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { IUser, User } from "../Gamma.Models/Identities/user";
import { HttpError } from "../Gamma.Common/models/httpError";
const bcrypt = require("bcryptjs");

export interface IUserRepository {
  CreateUser: (newUser: IUser, password: string) => Promise<User | HttpError>;
  LogInUser: (user: ILoginUserViewModel) => any;
  GetUserByEmail: (email: string) => Promise<User | HttpError>;
  GetUserByUserName: (userName: string) => Promise<User | HttpError>;
}
@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {

  constructor() {
    super();
  }

  public async CreateUser(newUser: IUser, password: string): Promise<User | HttpError> {

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError("Could not create user, please try again.", 500);

      return await Promise.resolve(error);
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

  public async GetUserByEmail(email: string): Promise<User | HttpError> {
    const result = await ApplicationDbContext.Prisma.user
      .findFirst({
        where: { Email: email },
      }).catch(e => {
        return Promise.resolve(e);
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  public async GetUserByUserName(userName: string): Promise<User | HttpError> {
    const result = await ApplicationDbContext.Prisma.user
      .findFirst({
        where: { UserName: userName },
      }).catch(e => {

        return Promise.resolve(e);
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }
}
