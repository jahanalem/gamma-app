import { injectable } from "inversify";
import { IPost, Post } from "../Gamma.Models/post";
import { ApplicationDbContext } from "./applicationDbContext";
import { BaseRepository } from "./baseRepository";

export interface IPostRepository {
  Create: (post: IPost) => Promise<void>;
  GetAll: () => Promise<Post[]>;
  GetById: (id: number) => Promise<Post>;
  Delete: (id: number) => Promise<any>;
  Update: (id: number, post: IPost) => Promise<Post>;
}

@injectable()
export class PostRepository extends BaseRepository implements IPostRepository {
  constructor() {
    super();
  }

  public async Create(post: IPost) {
    const result = await ApplicationDbContext.Prisma.post
      .create({
        data: {
          Title: post.Title,
          Summary: post.Summary,
          Description: post.Description,
          IsActive: post.IsActive,
          IsPublished: post.IsPublished,
          IsActiveNewComment: post.IsActiveNewComment,
          AuthorId: post.AuthorId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    // await ApplicationDbContext.db.execute(`INSERT INTO post (Title, Summary, Description, IsActive, IsPublished, IsActiveNewComment) VALUES (?,?,?,?,?,?)`, [ post.Title, post.Summary, post.Description, post.IsActive, post.IsPublished, post.IsActiveNewComment,]);
  }

  public async GetAll(): Promise<Post[]> {
    const allUsers = await ApplicationDbContext.Prisma.post
      .findMany({
        include: {
          Comments: true,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });
    console.dir(allUsers, { depth: null });

    return allUsers;
    //let data = await ApplicationDbContext.db.execute("SELECT * FROM post");
  }

  public async GetById(id: number): Promise<Post> {
    const data = await ApplicationDbContext.Prisma.post
      .findUnique({
        where: { Id: id },
        include: { Comments: true },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return data;
    //const data = await ApplicationDbContext.db.execute("SELECT * FROM post WHERE Id = ?",[id]);
  }

  public async Delete(id: number) {
    const data = await ApplicationDbContext.Prisma.post
      .delete({
        where: { Id: id },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    //const data = await ApplicationDbContext.db.execute("DELETE FROM post WHERE id = ?",[id]);

    return data;
  }

  public async Update(id: number, post: IPost) {
    const result = await ApplicationDbContext.Prisma.post
      .update({
        where: { Id: id },
        data: {
          Title: post.Title,
          Summary: post.Summary,
          Description: post.Description,
          IsActive: post.IsActive,
          IsPublished: post.IsPublished,
          IsActiveNewComment: post.IsActiveNewComment,
          AuthorId: post.AuthorId,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return result;
  }
}
