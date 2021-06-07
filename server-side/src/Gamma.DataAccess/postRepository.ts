import { injectable } from "inversify";
import { IPost, Post } from "../Gamma.Models/post";
import { ApplicationDbContext } from "./applicationDbContext";

export interface IPostRepository {
  Create: (post: IPost) => Promise<void>;
  GetAll: () => Promise<Post[]>;
  GetById: (id: number) => Promise<Post>;
  Delete: (id: number) => Promise<any>;
}

@injectable()
export class PostRepository implements IPostRepository {
  constructor() {}

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

    console.log("<<< DataAccess Layer  start>>>");
    /*
    await ApplicationDbContext.db.execute(
      `INSERT INTO post (Title, Summary, Description, IsActive, IsPublished, IsActiveNewComment) 
                  VALUES (?,?,?,?,?,?)`,
      [
        post.Title,
        post.Summary,
        post.Description,
        post.IsActive,
        post.IsPublished,
        post.IsActiveNewComment,
      ]
    );
    */

    console.log("<<< DataAccess Layer  finish>>>");
    //return id;
  }

  public async GetAll(): Promise<Post[]> {
    const allUsers = await ApplicationDbContext.Prisma.post
      .findMany({
        include: {
          Comment: true,
        },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });
    console.dir(allUsers, { depth: null });

    return allUsers;
    //let data = await ApplicationDbContext.db.execute("SELECT * FROM post");
    //return data[0];
  }

  public async GetById(id: number): Promise<Post> {
    const data = await ApplicationDbContext.Prisma.post
      .findUnique({
        where: { Id: id },
        include: { Comment: true },
      })
      .finally(async () => {
        await ApplicationDbContext.Prisma.$disconnect();
      });

    return data;
    //const data = await ApplicationDbContext.db.execute("SELECT * FROM post WHERE Id = ?",[id]);
    //return data[0];
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
}
