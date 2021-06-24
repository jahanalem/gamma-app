import { Nullable } from "../global";
import { Entity, IEntity } from "./Entity";
import { IPost, Post } from "./post";

export interface ICategory extends IEntity {
  Title: string;
  IsActive: boolean;
  ParentId?: Nullable<string>;
  Parent?: ICategory;
  Posts?: Post[];
}

export class Category extends Entity implements ICategory {
  public Title: string;
  public IsActive: boolean;
  ParentId?: string;
  Parent?: ICategory;
  Posts?: Post[];
  constructor(
    title: string,
    isActive: boolean = true,
    parentId: string = null
  ) {
    super();
    this.Title = title;
    this.IsActive = isActive;
    this.ParentId = parentId;
  }
}
