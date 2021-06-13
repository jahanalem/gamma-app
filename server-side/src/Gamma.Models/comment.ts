import { Nullable } from "./../global.d";
import { Entity } from "./Entity";

export interface IComment {
  Description: string;
  //ParentId: Nullable<number>;
  UserId: number;
  PostId: number;
  //Parent: IComment>;
  //Replies: IComment[]>;
}

export class Comment extends Entity implements IComment {
  //ParentId: number> = null;
  //Parent: IComment> = null;
  //Replies: IComment[]> = [];
  PostId: number = null;
  UserId: number = null;
  Description: string;
  constructor(description: string, postId: number, userId: number) {
    super();
    this.Description = description;
    this.PostId = postId;
    this.UserId = userId;
  }
}
