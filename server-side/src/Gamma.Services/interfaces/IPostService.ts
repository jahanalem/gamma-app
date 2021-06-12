import { IPost, Post } from "../../Gamma.Models/post";

export interface IPostService {
  GetAll: () => Promise<Post[]>;
  GetById: (id: number) => Promise<Post>;
  Create: (post: IPost) => any;
  Delete: (id: number) => any;
  Update: (id: number, post: IPost) => Promise<Post>;
}
