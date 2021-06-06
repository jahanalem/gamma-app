import { Nullable } from "../global";
import { Entity } from "./Entity";
import { Post } from "./post";

export interface IPostCategory {
  Title: string;
  IsActive: boolean;
  ParentId?: Nullable<number>;
  Parent?: IPostCategory;
  Posts?: Post[];
}

export class PostCategory extends Entity implements IPostCategory {
  public Title: string;
  public IsActive: boolean;
  ParentId?: Nullable<number>;
  Parent?: IPostCategory;
  Posts?: Post[];
  constructor(
    title: string,
    isActive: boolean = true,
    parentId: Nullable<number> = null
  ) {
    super();
    this.Title = title;
    this.IsActive = isActive;
  }
}
