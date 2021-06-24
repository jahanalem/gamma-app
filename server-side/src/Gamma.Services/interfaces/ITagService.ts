import { ITag, Tag } from "../../Gamma.Models/tag";

export interface ITagService {
  GetAll: () => Promise<Tag[]>;
  GetById: (id: string) => Promise<Tag>;
  Create: (tag: ITag) => Promise<Tag>;
  Delete: (id: string) => Promise<Tag>;
  Update: (id: string, tag: ITag) => Promise<Tag>;
  CreateMany(tags: ITag[]): Promise<number>;
}
