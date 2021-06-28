import { IEntity } from "./entityModel";
import { ITagModel } from "./tagModel";
import { IUserModel } from "./userModel";

export interface IPostModel extends IEntity {
  Title: string;
  Summary: string;
  Description: string;
  IsActive: boolean;
  IsPublished: boolean;
  IsActiveNewComment: boolean;
  Author?: IUserModel;
  AuthorId: string;
  Tags: ITagModel[];
}