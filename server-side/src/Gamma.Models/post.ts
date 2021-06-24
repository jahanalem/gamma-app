import { User } from "./Identities/user";
import { Entity, IEntity } from "./Entity";
import { ITag, Tag } from "./tag";
import { ICategory } from "./category";

export interface IPost extends IEntity {
  Title: string;
  Summary: string;
  Description: string;
  IsActive: boolean;
  IsPublished: boolean;
  IsActiveNewComment: boolean;
  AuthorId: string;
  Author?: User;
  CategoryId?: string;
  Category?: ICategory;
  Tags?: ITag[];
}

export class Post extends Entity implements IPost {
  Title: string;
  Summary: string;
  Description: string;
  IsActive: boolean;
  IsPublished: boolean;
  IsActiveNewComment: boolean;
  AuthorId: string;
  Author?: User;
  Tags?: ITag[];
  CategoryId?: string;
  Category?: ICategory;

  constructor(
    title: string,
    summary: string,
    description: string,
    isActive: boolean,
    isPublished: boolean,
    isActiveNewComment: boolean,
    authorId: string,
    tags: ITag[] = null,
    categoryId: string = null
  ) {
    super();
    this.Title = title;
    this.Summary = summary;
    this.Description = description;
    this.IsActive = isActive;
    this.IsPublished = isPublished;
    this.IsActiveNewComment = isActiveNewComment;
    this.AuthorId = authorId;
    this.Tags = tags;
    this.CategoryId = categoryId;
  }
}
