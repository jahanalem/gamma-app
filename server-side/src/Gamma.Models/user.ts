import { Entity } from "./Entity";
import { Post } from "./post";
import { Profile } from "./profile";

export interface IUser {
  Email: string;
  Name: string;
  Posts: Post[];
  Profile: Profile;
  Comments: Comment[];
}

export class User extends Entity implements IUser {
  constructor(email: string, name: string) {
    super();
    this.Email = email;
    this.Name = name;
  }
  Email: string;
  Name: string;
  Posts: Post[];
  Profile: Profile;
  Comments: Comment[];
}
