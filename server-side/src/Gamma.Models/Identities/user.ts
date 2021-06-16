import { timeStamp } from "console";
import { Entity } from "../Entity";
import { Post } from "../post";
import { Profile } from "../profile";
import { Role } from "./role";

export interface IUser {
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
  Roles?: Role[];
  Posts?: Post[];
  Profile?: Profile;
  Comments?: Comment[];
}

export class User extends Entity implements IUser {
  constructor(user: Partial<User> = {}) {
    super();
    Object.assign(this, user);

    this.NormalizedEmail = this.Email.toUpperCase();
    this.NormalizedUserName = this.UserName.toUpperCase();
  }
  Token?: string;
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
  FirstName: string = null;
  LastName: string = null;
  BirthDate: Date;
  IsEmailPublic: boolean;
  Location: string;
  IpAddress: string;
  LoginProvider: string;
  IsActive: boolean = true;
  Roles?: Role[];
  Email: string;
  Posts?: Post[];
  Profile?: Profile;
  Comments?: Comment[];
}
