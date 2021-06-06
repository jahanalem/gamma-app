import { IPost } from "../../Gamma.Models/post";

export interface IPostService {
    GetAll: () => any;
    GetById: (id: number) => any;
    Create: (post: IPost) => any;
    Delete: (id: number) => any;
  }