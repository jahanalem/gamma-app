import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { IPostRepository } from "../Gamma.DataAccess/postRepository";
import { IPost } from "../Gamma.Models/post";
import { IPostService } from "./interfaces/IPostService";

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(TYPES.IPostRepository) private postRepository: IPostRepository
  ) {}

  public GetAll() {
    return this.postRepository.GetAll();
  }

  public async GetById(id: number) {
    return this.postRepository.GetById(id);
  }

  public async Create(Post: IPost) {
    console.log("<<< ServiceLayer >>>");
    return await this.postRepository.Create(Post);
  }

  public async Delete(id: number) {
    return this.postRepository.Delete(id);
  }
}
