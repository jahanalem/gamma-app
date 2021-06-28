import { IEntity } from "./entityModel";
import { IPostModel } from "./postModel";
import { IUserModel } from "./userModel";

export interface ICommentModel extends IEntity {
    Description: string;
    ParentId: string | null;
    WrittenById: string;
    WrittenBy?: IUserModel;
    PostId: string;
    Post?: IPostModel;
}
