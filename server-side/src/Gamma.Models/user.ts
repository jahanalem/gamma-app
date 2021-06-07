import { Post } from "./post";
import { Profile } from "./profile";

export interface User {
  Id: number;
  Email: string;
  Name: string;
  Posts: Post[];
  Profile: Profile;
  Comments: Comment[];
}
