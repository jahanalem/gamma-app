import { Entity, IEntity } from "./Entity";

export interface ITag extends IEntity {
  Title: string;
  //IsActive: boolean;
}

export class Tag extends Entity implements ITag {
  Title: string;
  //IsActive: boolean;

  constructor(title: string) {
    super();
    this.Title = title;
    //this.IsActive = isActive;
  }
}
