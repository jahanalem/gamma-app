export interface IEntity {
    Id?: string;
    CreatedDate?: Date;
    ModifiedDate?: Date;
}


export class Entity implements IEntity {
    public Id?: string;
    public CreatedDate?: Date;
    public ModifiedDate?: Date;
    constructor() {
    }
}
