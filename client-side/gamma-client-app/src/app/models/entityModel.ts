export interface IEntity {
    Id?: number;
    CreatedDate?: Date;
    ModifiedDate?: Date;
}


export class Entity implements IEntity {
    public Id?: number;
    public CreatedDate?: Date;
    public ModifiedDate?: Date;
    constructor() {
    }
}
