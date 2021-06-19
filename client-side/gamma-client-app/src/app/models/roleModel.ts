import { IEntity } from "./entityModel";
import { IUserModel } from "./userModel";

export interface IRoleModel extends IEntity {
    Name: string;
    NormalizedName: string;
    Description: string;
    Users: IUserModel[];
}