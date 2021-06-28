import { IEntity } from "./entityModel";
import { IUserModel } from "./userModel";

export interface IProfileModel extends IEntity {
    Id: string;
    Bio: string;
    User: IUserModel;
}
