import { IComment, Comment } from "../../Gamma.Models/comment";

export interface ICommentService {
  Create: (comment: IComment) => Promise<Comment>;
  GetAll: () => Promise<Comment[]>;
  GetById: (id: string) => Promise<Comment>;
  GetCommentsByPostId: (postId: string) => Promise<Comment[]>;
  GetCommentsByUserId:(userId: string)=> Promise<Comment[]>;
  Update: (id: string, comment: IComment) => Promise<Comment>;
  Delete: (id: string) => any;
}
