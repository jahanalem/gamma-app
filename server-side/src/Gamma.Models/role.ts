import { Entity, IEntity } from "./Entity";

export interface IRole extends IEntity {
    Name: string;
    Description?: string;
    NormalizedName?: string;
}

export class Role extends Entity implements IRole {
    Name: string;
    Description?: string;
    NormalizedName: string;

    constructor(name: string, description: string = null) {
        super();
        this.Name = name;
        this.Description = description;
        this.NormalizedName = this.Name.toUpperCase();
    }
}
