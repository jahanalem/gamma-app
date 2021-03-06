import { injectable } from "inversify";
import { ILoginUserViewModel } from "../Gamma.Models/ViewModels/loginUserViewModel";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { IUser, User } from "../Gamma.Models/Identities/user";
import { HttpError } from "../Gamma.Common/models/httpError";
import { HTTPStatusCodes } from "../Gamma.Common/constants/HTTPStatusCodes";
import { v4 } from 'uuid';

import { USERROLES } from "../Gamma.Constants/roleMembers";
const bcrypt = require("bcryptjs");

export interface IUserRepository {
  CreateUser: (newUser: IUser, password: string, userRole: string) => Promise<User>;
  LogInUser: (user: ILoginUserViewModel) => any;
  GetUserByEmail: (email: string) => Promise<User>;
  GetUserByUserName: (userName: string) => Promise<User>;
  GetByCriteria(): Promise<User[]>;
}
@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
  constructor() {
    super();
  }


  public async CreateUser(newUser: IUser, password: string, userRole: string = USERROLES.CONTRIBUTOR): Promise<User> {

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      throw (new HttpError("Could not create user, please try again.", HTTPStatusCodes.ServerError.InternalServerError));
    }

    let roleId = await ApplicationDbContext.Prisma.role.findFirst({
      where: { NormalizedName: userRole.toUpperCase() },
      select: { Id: true }
    })

    let userId;
    (!newUser.Id) ? userId = v4() : userId = newUser.Id;

    const transResult = await ApplicationDbContext.Prisma.$transaction([
      ApplicationDbContext.Prisma.user.create({
        data: {
          Id: userId,
          Email: newUser.Email,
          NormalizedEmail: newUser.NormalizedEmail,
          UserName: newUser.UserName,
          NormalizedUserName: newUser.NormalizedUserName,
          FirstName: newUser.FirstName,
          LastName: newUser.LastName,
          IsActive: newUser.IsActive,
          PasswordHash: hashedPassword
        },
      }),
      ApplicationDbContext.Prisma.userRoleMapping.create({
        data: {
          RoleId: roleId.Id,
          UserId: userId
        },
      }),
    ]).finally(async () => {
      await ApplicationDbContext.Prisma.$disconnect();
    });

    let result = transResult as unknown as User;

    return (result);
  }


  public async LogInUser(user: ILoginUserViewModel) { }


  public async GetUserByEmail(email: string): Promise<User> {
    const result = await ApplicationDbContext.Prisma.user
      .findFirst({
        where: { Email: email },
        include: { Roles: { include: { Role: true } } }
      })
      .catch(e => {
        throw (e);
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    const user = result as unknown as IUser;

    return user;
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


  public async GetByCriteria(): Promise<User[]> {
    const result = await ApplicationDbContext.Prisma.user.findMany()
      .catch(err => { throw (err) })
      .finally(async () => { await ApplicationDbContext.Prisma.$disconnect(); });

    return result;
  }
}
