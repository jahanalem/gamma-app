import { Nullable } from "./../global.d";
import { Entity } from "./Entity";

export interface IComment {
  Description: string;
  //ParentId: Nullable<number>;
  UserId: Nullable<number>;
  PostId: Nullable<number>;
  //Parent: Nullable<IComment>;
  //Replies: Nullable<IComment[]>;
}

export class Comment extends Entity implements IComment {
  //ParentId: Nullable<number> = null;
  //Parent: Nullable<IComment> = null;
  //Replies: Nullable<IComment[]> = [];
  PostId: Nullable<number> = null;
  UserId: Nullable<number> = null;
  Description: string;
  constructor(description: string, postId: number, userId: number) {
    super();
    this.Description = description;
    this.PostId = postId;
    this.UserId = userId;
  }
}
