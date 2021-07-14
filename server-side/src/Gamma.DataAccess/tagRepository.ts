import { ITag, Tag } from "../Gamma.Models/tag";
import { BaseRepository } from "./baseRepository";
import { ApplicationDbContext } from "./applicationDbContext";
import { injectable } from "inversify";

export interface ITagRepository {
  Create: (tag: ITag) => Promise<Tag>;
  GetAll: () => Promise<Tag[]>;
  GetById: (id: string) => Promise<Tag>;
  Delete: (id: string) => Promise<Tag>;
  Update: (id: string, tag: ITag) => Promise<Tag>;
  CreateMany(tags: ITag[]): Promise<number>;
}

@injectable()
export class TagRepository extends BaseRepository implements ITagRepository {
  constructor() {
    super();
  }

  //#region CREATE REGION

  public async Create(tag: ITag): Promise<Tag> {
    const result = await ApplicationDbContext.Prisma.tag
      .create({
        data: {
          Title: tag.Title,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }


  public async CreateMany(tags: ITag[]): Promise<number> {
    const result = await ApplicationDbContext.Prisma.tag.createMany({
      data: tags,
      skipDuplicates: true
    })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result.count;
  }


  //#endregion

  //#region READ REGION

  public async GetAll(): Promise<Tag[]> {
    const result = await ApplicationDbContext.Prisma.tag
      .findMany()
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  
  public async GetById(id: string): Promise<Tag> {
    const result = await ApplicationDbContext.Prisma.tag
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

  public async Update(id: string, tag: ITag): Promise<Tag> {
    const result = await ApplicationDbContext.Prisma.tag
      .update({
        where: { Id: id },
        data: { Title: tag.Title },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }

  //#endregion

  //#region DELETE REGION

  public async Delete(id: string): Promise<Tag> {
    const result = await ApplicationDbContext.Prisma.tag
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
