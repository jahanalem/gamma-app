import { User } from "./Identities/user";

export interface Profile {
  Id: number;
  Bio: string;
  User: User;
}
