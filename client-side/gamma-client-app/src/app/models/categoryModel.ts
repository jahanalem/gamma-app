import { IEntity } from "./entityModel";
import { IPostModel } from "./postModel";

export interface ICategoryModel extends IEntity {
    Title: string;
    IsActive: boolean;
    ParentId?: string | null;
    Parent?: ICategoryModel;
    Posts?: IPostModel[];
}