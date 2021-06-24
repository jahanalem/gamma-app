import { Category, ICategory } from "../../Gamma.Models/category";

export interface ICategoryService {
  Create: (category: ICategory) => Promise<Category>;
  GetAll: () => Promise<Category[]>;
  GetById: (id: string) => Promise<Category>;
  Update: (id: string, category: ICategory) => Promise<Category>;
  Delete: (id: string) => Promise<Category>;
  CreateMany(Categories: ICategory[]): Promise<number>
}
