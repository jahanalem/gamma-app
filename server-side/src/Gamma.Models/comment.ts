import { IUser } from "./Identities/user";
import { Nullable } from "./../global.d";
import { Entity, IEntity } from "./Entity";
import { IPost } from "./post";

export interface IComment extends IEntity {
  Description: string;
  ParentId: Nullable<string>;
  WrittenById: string;
  WrittenBy?: IUser;
  PostId: string;
  Post?: IPost;
}

export class Comment extends Entity implements IComment {
  ParentId: string;
  WrittenById: string;
  WrittenBy?: IUser;
  Post?: IPost;
  PostId: string;
  Description: string;
  constructor(
    description: string,
    postId: string,
    writtenById: string,
    parentId: string = null
  ) {
    super();
    this.Description = description;
    this.PostId = postId;
    this.WrittenById = writtenById;
    this.ParentId = parentId;
  }
}
