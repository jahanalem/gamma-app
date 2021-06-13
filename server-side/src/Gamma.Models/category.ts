import { Nullable } from "../global";
import { Entity } from "./Entity";
import { IPost, Post } from "./post";

export interface ICategory {
  Title: string;
  IsActive: boolean;
  ParentId?: Nullable<number>;
  Parent?: ICategory;
  Posts?: Post[];
}

export class Category extends Entity implements ICategory {
  public Title: string;
  public IsActive: boolean;
  ParentId?: number;
  Parent?: ICategory;
  Posts?: Post[];
  constructor(
    title: string,
    isActive: boolean = true,
    parentId: number = null
  ) {
    super();
    this.Title = title;
    this.IsActive = isActive;
    this.ParentId = parentId;
  }
}
