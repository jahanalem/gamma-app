import { ITagService } from "./interfaces/ITagService";
import { BaseService } from "./baseService";
import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { ITagRepository } from "../Gamma.DataAccess/tagRepository";
import { ITag, Tag } from "../Gamma.Models/tag";

@injectable()
export class TagService extends BaseService implements ITagService {
  constructor(
    @inject(TYPES.ITagRepository) private tagRepository: ITagRepository
  ) {
    super();
  }

  public async GetAll(): Promise<Tag[]> {
    return await this.tagRepository.GetAll();
  }

  public async GetById(id: number): Promise<Tag> {
    return await this.tagRepository.GetById(id);
  }

  public async Create(tag: ITag): Promise<Tag> {
    console.log("tag service create");
    return await this.tagRepository.Create(tag);
  }

  public async Delete(id: number): Promise<Tag> {
    return await this.tagRepository.Delete(id);
  }

  public async Update(id: number, tag: ITag): Promise<Tag> {
    return await this.tagRepository.Update(id, tag);
  }
}