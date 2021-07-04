import { ICommentService } from "./interfaces/ICommentService";
import { BaseService } from "./baseService";
import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { ICommentRepository } from "../Gamma.DataAccess/commentRepository";
import { IComment, Comment } from "../Gamma.Models/comment";

@injectable()
export class CommentService extends BaseService implements ICommentService {
  constructor(
    @inject(TYPES.ICommentRepository)
    private commentRepository: ICommentRepository
  ) {
    super();
  }


  public async Create(comment: IComment): Promise<Comment> {
    return await this.commentRepository.Create(comment);
  }


  public async GetAll(): Promise<Comment[]> {
    return await this.commentRepository.GetAll();
  }


  public async GetById(id: string): Promise<Comment> {
    return await this.commentRepository.GetById(id);
  }


  public async GetCommentsByPostId(postId: string): Promise<Comment[]> {
    return await this.commentRepository.GetCommentsByPostId(postId);
  }


  public async GetCommentsByUserId(userId: string) {
    return await this.commentRepository.GetCommentsByUserId(userId);
  }


  public async Update(id: string, comment: IComment): Promise<Comment> {
    return await this.commentRepository.Update(id, comment);
  }


  public async Delete(id: string): Promise<Comment> {
    return await this.commentRepository.Delete(id);
  }
}
