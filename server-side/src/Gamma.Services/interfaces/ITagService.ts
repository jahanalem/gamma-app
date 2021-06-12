import { ITag, Tag } from "../../Gamma.Models/tag";

export interface ITagService {
  GetAll: () => Promise<Tag[]>;
  GetById: (id: number) => Promise<Tag>;
  Create: (tag: ITag) => Promise<Tag>;
  Delete: (id: number) => Promise<Tag>;
  Update: (id: number, tag: ITag) => Promise<Tag>;
}
