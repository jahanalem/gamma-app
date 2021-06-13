import { ICategory, Category } from "../Gamma.Models/category";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { injectable } from "inversify";

export interface ICategoryRepository {
  Create: (Category: ICategory) => Promise<Category>;
  GetAll: () => Promise<Category[]>;
  GetById: (id: number) => Promise<Category>;
  Delete: (id: number) => Promise<Category>;
  Update: (id: number, Category: ICategory) => Promise<Category>;
}

@injectable()
export class CategoryRepository
  extends BaseRepository
  implements ICategoryRepository
{
  constructor() {
    super();
  }

  //#region CREATE REGION

  public async Create(category: ICategory): Promise<Category> {
    const result = await ApplicationDbContext.Prisma.category
      .create({
        data: {
          Title: category.Title,
          IsActive: category.IsActive,
          ParentId: category.ParentId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion

  //#region READ REGION

  public async GetAll(): Promise<Category[]> {
    const result = await ApplicationDbContext.Prisma.category
      .findMany()
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  public async GetById(id: number): Promise<Category> {
    const result = await ApplicationDbContext.Prisma.category
      .findFirst({
        where: { Id: id },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion

  //#region UPDATE REGION

  public async Update(id: number, category: ICategory): Promise<Category> {
    const result = await ApplicationDbContext.Prisma.category
      .update({
        where: { Id: id },
        data: {
          Title: category.Title,
          IsActive: category.IsActive,
          ParentId: category.ParentId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion

  //#region DELETE REGION

  public async Delete(id: number): Promise<Category> {
    const result = await ApplicationDbContext.Prisma.category
      .delete({
        where: { Id: id },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion
}
