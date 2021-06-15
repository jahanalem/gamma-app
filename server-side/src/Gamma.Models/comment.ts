import { IUser } from "./Identities/user";
import { Nullable } from "./../global.d";
import { Entity } from "./Entity";
import { IPost } from "./post";

export interface IComment {
  Description: string;
  ParentId: Nullable<number>;
  WrittenById: number;
  WrittenBy?: IUser;
  PostId: number;
  Post?: IPost;
}

export class Comment extends Entity implements IComment {
  ParentId: number;
  WrittenById: number;
  WrittenBy?: IUser;
  Post?: IPost;
  PostId: number;
  Description: string;
  constructor(
    description: string,
    postId: number,
    writtenById: number,
    parentId: number = null
  ) {
    super();
    this.Description = description;
    this.PostId = postId;
    this.WrittenById = writtenById;
    this.ParentId = parentId;
  }
}
