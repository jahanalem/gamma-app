import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { IPostRepository } from "../Gamma.DataAccess/postRepository";
import { IPost, Post } from "../Gamma.Models/post";
import { BaseService } from "./baseService";
import { IPostService } from "./interfaces/IPostService";

@injectable()
export class PostService extends BaseService implements IPostService {
  constructor(
    @inject(TYPES.IPostRepository) private postRepository: IPostRepository
  ) {
    super();
  }

  public async GetAll(): Promise<Post[]> {
    return this.postRepository.GetAll();
  }

  public async GetById(id: string): Promise<Post> {
    return this.postRepository.GetById(id);
  }

  public async Create(Post: IPost):Promise<IPost> {
    console.log("<<< ServiceLayer >>>");
    return await this.postRepository.Create(Post);
  }

  public async Delete(id: string) {
    return this.postRepository.Delete(id);
  }

  public async Update(id: string, post: IPost) {
    return this.postRepository.Update(id, post);
  }
}
