import { IPost, Post } from "../../Gamma.Models/post";

export interface IPostService {
  GetAll: () => Promise<Post[]>;
  GetById: (id: string) => Promise<Post>;
  Create: (post: IPost) => any;
  Delete: (id: string) => any;
  Update: (id: string, post: IPost) => Promise<Post>;
}
