import { Entity } from "../Entity";
import { Post } from "../post";
import { Profile } from "../profile";
import { Role } from "./role";

export interface IUser {
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
  Roles: Role[];
  Posts: Post[];
  Profile: Profile;
  Comments: Comment[];
}

export class User extends Entity implements IUser {
  constructor(email: string, username: string) {
    super();
    this.Email = email;
    this.NormalizedEmail = this.Email.toUpperCase();
    this.UserName = username;
    this.NormalizedUserName = this.UserName.toUpperCase();
  }
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
  Roles: Role[];
  Email: string;
  Posts: Post[];
  Profile: Profile;
  Comments: Comment[];
}
