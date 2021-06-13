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

  public async GetById(id: number): Promise<Comment> {
    return await this.commentRepository.GetById(id);
  }

  public async GetCommentsByPostId(postId: number): Promise<Comment[]> {
    return await this.commentRepository.GetCommentsByPostId(postId);
  }

  public async GetCommentsByUserId(userId: number) {
    return await this.commentRepository.GetCommentsByUserId(userId);
  }

  public async Update(id: number, comment: IComment): Promise<Comment> {
    return await this.commentRepository.Update(id, comment);
  }

  public async Delete(id: number): Promise<Comment> {
    return await this.commentRepository.Delete(id);
  }
}
