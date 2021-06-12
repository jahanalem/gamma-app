import { Entity } from "./Entity";

export interface ITag {
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
