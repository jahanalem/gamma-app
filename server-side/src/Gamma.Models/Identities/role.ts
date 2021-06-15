import { Entity } from "../Entity";
import { User } from "./user";

export interface IRole {
  Name: string;
  NormalizedName: string;
  Description: string;
  Users: User[];
}

export class Role extends Entity implements IRole {
  constructor(name: string, description: string = "") {
    super();
    this.Name = name;
    this.Description = description;
    this.NormalizedName = this.Name.toUpperCase();
  }
  Name: string;
  NormalizedName: string;
  Description: string;
  Users: User[];
}
