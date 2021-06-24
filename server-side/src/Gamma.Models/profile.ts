import { IEntity } from "./Entity";
import { User } from "./Identities/user";

export interface Profile extends IEntity {
  Id: string;
  Bio: string;
  User: User;
}
