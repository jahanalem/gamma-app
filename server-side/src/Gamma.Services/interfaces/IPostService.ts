import { IPost, Post } from "../../Gamma.Models/post";

export interface IPostService {
  GetAll: () => Promise<Post[]>;
  GetById: (id: string) => Promise<Post>;
  GetByTagId(tagId: string): Promise<IPost[]>;
  GetByCategoryId(catId: string): Promise<IPost[]>
  Create: (post: IPost) => Promise<IPost>;
  Delete: (id: string) => any;
  Update: (id: string, post: IPost) => Promise<Post>;
}
