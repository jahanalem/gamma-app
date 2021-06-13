import { inject, injectable } from "inversify";
import TYPES from "../Gamma.Constants/types";
import { ICategoryRepository } from "../Gamma.DataAccess/categoryRepository";
import { Category, ICategory } from "../Gamma.Models/category";
import { BaseService } from "./baseService";
import { ICategoryService } from "./interfaces/ICategoryService";

@injectable()
export class CategoryService extends BaseService implements ICategoryService {
  constructor(
    @inject(TYPES.ICategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {
    super();
  }

  public async Create(Category: ICategory): Promise<Category> {
    console.log("Category service create");
    return await this.categoryRepository.Create(Category);
  }

  public async GetAll(): Promise<Category[]> {
    return await this.categoryRepository.GetAll();
  }

  public async GetById(id: number): Promise<Category> {
    return await this.categoryRepository.GetById(id);
  }

  public async Update(id: number, Category: ICategory): Promise<Category> {
    return await this.categoryRepository.Update(id, Category);
  }

  public async Delete(id: number): Promise<Category> {
    return await this.categoryRepository.Delete(id);
  }
}
