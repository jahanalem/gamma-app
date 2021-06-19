import { IEntity } from "./entityModel";
import { IUserModel } from "./userModel";

export interface IProfileModel extends IEntity {
    Id: number;
    Bio: string;
    User: IUserModel;
}
