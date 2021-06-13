import { IComment, Comment } from "../../Gamma.Models/comment";

export interface ICommentService {
  Create: (comment: IComment) => Promise<Comment>;
  GetAll: () => Promise<Comment[]>;
  GetById: (id: number) => Promise<Comment>;
  GetCommentsByPostId: (postId: number) => Promise<Comment[]>;
  GetCommentsByUserId:(userId: number)=> Promise<Comment[]>;
  Update: (id: number, comment: IComment) => Promise<Comment>;
  Delete: (id: number) => any;
}
