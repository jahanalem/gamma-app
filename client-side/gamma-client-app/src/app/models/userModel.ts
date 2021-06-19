import { ICommentModel } from "./commentModel";
import { IEntity } from "./entityModel";
import { IPostModel } from "./postModel";
import { IProfileModel } from "./profileModel";
import { IRoleModel } from "./roleModel";

export interface IUserModel extends IEntity {
  Token?: string;
  Email: string;
  NormalizedEmail: string;
  UserName: string;
  NormalizedUserName: string;
  EmailConfirmed: boolean;
  PasswordHash: string;
  PhoneNumber: string;
  PhoneNumberConfirmed: boolean;
  LockoutEnd: Date;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
  FirstName: string;
  LastName: string;
  BirthDate: Date;
  IsEmailPublic: boolean;
  Location: string;
  IpAddress: string;
  LoginProvider: string;
  IsActive: boolean;
  Roles?: IRoleModel[];
  Posts?: IPostModel[];
  Profile?: IProfileModel;
  Comments?: ICommentModel[];
}
