import { Category, ICategory } from "../../Gamma.Models/category";

export interface ICategoryService {
  Create: (category: ICategory) => Promise<Category>;
  GetAll: () => Promise<Category[]>;
  GetById: (id: number) => Promise<Category>;
  Update: (id: number, category: ICategory) => Promise<Category>;
  Delete: (id: number) => Promise<Category>;
}
