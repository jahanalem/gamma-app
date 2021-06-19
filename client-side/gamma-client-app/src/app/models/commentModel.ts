import { IEntity } from "./entityModel";
import { IPostModel } from "./postModel";
import { IUserModel } from "./userModel";

export interface ICommentModel extends IEntity {
    Description: string;
    ParentId: number | null;
    WrittenById: number;
    WrittenBy?: IUserModel;
    PostId: number;
    Post?: IPostModel;
}
