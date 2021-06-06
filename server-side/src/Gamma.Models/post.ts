import { Entity } from "./Entity";

export interface IPost {
  Title: string;
  Summary: string;
  Description: string;
  IsActive: boolean;
  IsPublished: boolean;
  IsActiveNewComment: boolean;
}

export class Post extends Entity implements IPost {
  Title: string;
  Summary: string;
  Description: string;
  IsActive: boolean;
  IsPublished: boolean;
  IsActiveNewComment: boolean;

  constructor(
    title: string,
    summary: string,
    description: string,
    isActive: boolean,
    isPublished: boolean,
    isActiveNewComment: boolean
  ) {
    super();
    this.Title = title;
    this.Summary = summary;
    this.Description = description;
    this.IsActive = isActive;
    this.IsPublished = isPublished;
    this.IsActiveNewComment = isActiveNewComment;
  }
}
