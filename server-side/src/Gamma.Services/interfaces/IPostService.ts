import { IPost, Post } from "../../Gamma.Models/post";

export interface IPostService {
  GetAll: () => Promise<Post[]>;
  GetById: (id: string) => Promise<Post>;
  Create: (post: IPost) => Promise<IPost>;
  Delete: (id: string) => any;
  Update: (id: string, post: IPost) => Promise<Post>;
}
